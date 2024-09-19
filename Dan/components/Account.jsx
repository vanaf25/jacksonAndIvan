import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import DashboardTabs from "./DashboardTabs";
import React from "react";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1,
    },
  },
};

const itemVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

export default function Account({ session }) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [docsLoading, setDocsLoading] = useState(true);
  const [profile, setProfile] = useState({
    username: "",
    website: "",
    company_address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    company_email: "",
    avatar_url: "",
    customers: [],
  });
  const [documents, setDocuments] = useState([]);
  const [open, cycleOpen] = useCycle(false, true);
  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session]);
  const fetchData = async () => {
    await Promise.all([getProfile(), getDocuments(), getCustomers()]);
  };
  const handleSupabaseError = (error, status) => {
    if (error && status !== 406) {
      console.error(error);
      alert("Error loading data");
    }
  };
  async function getProfile() {
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      let { data, error, status } = await supabase
          .from("profiles")
          .select(
              `username, website, avatar_url, customers, phone, company_email, company_address, city, state, zip`
          )
          .eq("id", user.id)
          .single();

      handleSupabaseError(error, status);

      if (data) {
        setProfile({
          username: data.username,
          website: data.website,
          avatar_url: data.avatar_url,
          customers: data.customers,
          phone: data.phone,
          company_email: data.company_email,
          company_address: data.company_address,
          city: data.city,
          state: data.state,
          zip: data.zip,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  async function getDocuments() {
    try {
      setDocsLoading(true);
      if (!user) throw new Error("No user");

      let { data, error, status } = await supabase
          .from("documents")
          .select(
              "id, fields, client, client_address, company, created_at, service, totalPrice, client_id, custom_fields, notes, type, instructions, line_items"
          )
          .eq("created_by", user.id);

      handleSupabaseError(error, status);

      if (data) setDocuments(data);
    } catch (error) {
      console.error(error);
    } finally {
      setDocsLoading(false);
    }
  }
  async function getCustomers() {
    try {
      if (!user) throw new Error("No user");

      let { data, error, status } = await supabase
          .from("customers")
          .select("id, created_at, name, address, city, state, zip, email, phone, client_id")
          .eq("created_by", user.id);

      handleSupabaseError(error, status);

      if (data) setProfile((prev) => ({ ...prev, customers: data }));
    } catch (error) {
      console.error(error);
    }
  }
  async function updateProfile() {
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      const updates = {
        id: user.id,
        ...profile,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);
      if (error) throw error;

      alert("Profile updated!");
    } catch (error) {
      console.error(error);
      alert("Error updating the data");
    } finally {
      setLoading(false);
    }
  }
  // Array of profile fields for dynamic rendering
  const profileFields = [
    { label: "Name", id: "username", value: profile.username },
    { label: "Company Name", id: "website", value: profile.website },
    { label: "Company Email", id: "company_email", value: profile.company_email},
    { label: "Company Phone", id: "phone", value: profile.phone },
    { label: "Address", id: "company_address", value: profile.company_address },
    { label: "City", id: "city", value: profile.city },
    { label: "State", id: "state", value: profile.state },
    { label: "Zip", id: "zip", value: profile.zip },
  ];

  return (
      <>
        <AnimatePresence>
          {open && (
              <motion.aside
                  initial={{ width: 0 }}
                  animate={{ width: "50%" }}
                  exit={{ width: 0, transition: { duration: 0.3 } }}
                  className="w-[50vw] h-[100vh] overflow-y-scroll overflow-x-hidden fixed top-0 left-0 ml-0 rounded-2xl bg-slate-100 text-slate-800 z-500"
              >
                <motion.div
                    className="container m-10"
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={sideVariants}
                >
                  <motion.div variants={itemVariants} className="form-widget">
                    <h3>Your Account</h3>
                    <div>
                      <label htmlFor="email">Account Email</label>
                      <input id="email" type="text" value={session.user.email} disabled />
                    </div>

                    {/* Map through profileFields to render ProfileInput components */}
                    {profileFields.map((field) =><ProfileInput
                            key={field.id}
                            label={field.label}
                            id={field.id}
                            value={field.value}
                            onChange={(e) =>
                                setProfile({ ...profile, [field.id]: e.target.value })
                            }
                        />
                    )}

                    <button
                        className="block bg-green-200"
                        onClick={updateProfile}
                        disabled={loading}
                    >
                      {loading ? "Loading ..." : "Update"}
                    </button>
                    <button className="button block" onClick={() => supabase.auth.signOut()}>
                      Sign Out
                    </button>
                  </motion.div>
                </motion.div>
              </motion.aside>
          )}
        </AnimatePresence>

        <div className="flex">
          <div className="text-4xl cursor-pointer absolute left-0 ml-4" onClick={cycleOpen}>
            {open ? "x" : <FontAwesomeIcon icon={faCircleUser} />}
          </div>
          <div className="w-full">
            <DashboardTabs
                username={profile.username}
                company={profile.website}
                companyPhone={profile.phone}
                companyAddress={`${profile.companyAddress}, ${profile.companyCity}, ${profile.companyState}`}
                companyEmail={profile.companyEmail}
                customers={profile.customers}
                documents={documents}
            />
          </div>
        </div>
      </>
  );
}

const ProfileInput = ({ label, id, value, onChange }) => (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" value={value || ""} onChange={onChange} />
    </div>
);
