import { useState, useEffect } from "react"
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react"
import DashboardTabs from "./DashboardTabs"
import React from "react";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'


const itemVariants = {
  closed: {
    opacity: 0
  },
  open: { opacity: 1 }
};

const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1
    }
  },
  open: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1
    }
  }
};

export default function Account({ session }) {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [docsLoading, setDocsLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [companyAddress, setCompanyAddress] = useState(null)
  const [companyCity, setCompanyCity] = useState(null)
  const [companyState, setCompanyState] = useState(null)
  const [companyZip, setCompanyZip] = useState(null)
  const [phone, setPhone] = useState(null)
  const [companyEmail, setCompanyEmail] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const [customers, setCustomers] = useState(null)
  const [updatedCustomers, setUpdatedCustomers] = useState(null)
  const [documents, setDocuments] = useState(null)
  const [open, cycleOpen] = useCycle(false, true);
  const [seed, setSeed] = useState(1);
  

  useEffect(() => {
    getProfile()
    getDocuments()
    getCustomers()


    console.log(customers)
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      if (!user) throw new Error("No user")

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url, customers, phone, company_email, company_address, city, state, zip`)
        .eq("id", user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
        // setCustomers(data.customers)
        setUpdatedCustomers(data.customers)
        setCompanyAddress(data.company_address)
        setCompanyCity(data.city)
        setCompanyState(data.state)
        setCompanyZip (data.zip)
        setPhone(data.phone)
        setCompanyEmail(data.company_email)
      }
    } catch (error) {
      alert("Error loading user data")
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function getDocuments() {
    try {
      setDocsLoading(true)
      if (!user) throw new Error("No user")

      let { data, error, status } = await supabase
      .from("documents")
      .select("id, fields, client, client_address, company, created_at, service, totalPrice, client_id, custom_fields, notes, type, instructions, line_items")
      .eq("created_by", user.id)

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setDocuments(data)
      }
    } catch (error) {
      alert("Error loading user data")
      console.log(error)
    } finally {
      setDocsLoading(false)
    }
  }

  async function getCustomers() {
    try {
      // setCustomersLoading(true)
      if (!user) throw new Error("No user")

      let { data, error, status } = await supabase
      .from("customers")
      .select("id, created_at, name, address, city, state, zip, email, phone, client_id")
      .eq("created_by", user.id)

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setCustomers(data)
      }
    } catch (error) {
      alert("Error loading user data")
      console.log(error)
    } finally {
      // setCustomersLoading(false)
    }
  }

  // function changeCustomerName(value, id, customers, type) {
  //   console.log(type)
  //   var elementPos = customers.customers
  //     .map(function(x) {
  //       return x.id
  //     })
  //     .indexOf(id)
  //   if (type === "name") {
  //     if (customers.customers[elementPos].name != value) {
  //       let newArray = { ...customers }
  //       // let newCustomers = {...customers, name : value};
  //       // setCustomers(newCustomers);
  //       console.log(customers.customers[elementPos].name)
  //       newArray.customers[elementPos].name = value
  //       console.log(newArray.customers)
  //       setUpdatedCustomers(newArray)
  //     }
  //   } else if (type === "address") {
  //     if (customers.customers[elementPos].address != value) {
  //       let newArray = { ...customers }
  //       // let newCustomers = {...customers, name : value};
  //       // setCustomers(newCustomers);
  //       console.log(customers.customers[elementPos].address)
  //       newArray.customers[elementPos].address = value
  //       console.log(newArray)
  //       setUpdatedCustomers(newArray)
  //     }
  //   }
  // }

  // function addCustomer(customers) {
  //   if (customers.customers != null && customers.customers.length > 0) {
  //     let newArray = { ...customers }
  //     let newid = newArray.customers[newArray.customers.length - 1].id + 1
  //     newArray.customers.push({
  //       id: newid,
  //       name: "Customer Name",
  //       address: "Address"
  //     })
  //     setUpdatedCustomers(newArray)
  //   } else {
  //     let newCustomers = [
  //       {
  //         id: 0,
  //         name: "Customer Name",
  //         address: "Address"
  //       }
  //     ]
  //     console.log(newCustomers)
  //     setCustomers(newCustomers)
  //   }
  // }

  function removeCustomer(id, customers) {
    let newArray = { ...customers }
    console.log("e", newArray.customers.length)
    var elementPos = newArray.customers
      .map(function(x) {
        return x.id
      })
      .indexOf(id)
    newArray.customers.splice(elementPos, 1)
    setUpdatedCustomers(newArray)
    console.log("ft", newArray)
  }

  async function updateProfile({ username, website, avatar_url, customers, phone, company_email, company_address, city, state, zip }) {
    try {
      setLoading(true)
      if (!user) throw new Error("No user")

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        customers,
        phone, 
        company_email, 
        company_address, 
        city, 
        state, 
        zip,
        updated_at: new Date().toISOString()
      }
      console.log(customers)
      let { error } = await supabase.from("profiles").upsert(updates)
      if (error) throw error
      alert("Profile updated!")
    } catch (error) {
      alert("Error updating the data")
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    <AnimatePresence>
    {open && (
      <motion.aside
        initial={{ width: 0 }}
        animate={{
          width: "50%"
        }}
        exit={{
          width: 0,
          transition: { delay: 0, duration: 0.3 }
        }}
        className="w-[50vw] h-[100vh] overflow-y-scroll overflow-x-hidden fixed top-0 left-0 ml-0 rounded-2xl bg-slate-100 text-slate-800 z-500"
      >
        <motion.div
          className="container overflow-y-scroll m-10"
          initial="closed"
          animate="open"
          exit="closed"
          variants={sideVariants}
        >
    <motion.div variants={itemVariants} className="form-widget">
    {/* <div className="text-4xl w-full justify-items-end transition-all ease-in-out left-0 absolute">
        <button onClick={cycleOpen}>{open ? "x" : 
         <svg viewBox="0 0 100 80" width="30" height="40">
           <rect width="100" height="10"></rect>
           <rect y="30" width="100" height="12"></rect>
           <rect y="60" width="100" height="10"></rect>
          </svg>
       }</button>
      </div> */}
      <h3>Your Account</h3>
      {/* <Avatar
        uid={user.id}
        url={avatar_url}
        size={150}
        onUpload={url => {
          setAvatarUrl(url)
          updateProfile({ username, website, avatar_url: url, customers,phone, company_email: companyEmail, company_address: companyAddress, city: companyCity, state: companyState, zip: companyZip })
        }}
      /> */}

      <div>
        <label htmlFor="email">Account Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Name</label>
        <input
          id="username"
          type="text"
          autocomplete="name"
          value={username || ""}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Company Name</label>
        <input
          id="website"
          type="website"
          value={website || ""}
          onChange={e => setWebsite(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="companyEmail">Company Email</label>
        <input
          id="companyEmail"
          type="text"
          value={companyEmail || ""}
          onChange={e => setCompanyEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="phone">Company Phone</label>
        <input
          id="phone"
          type="tel"
          pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
          value={phone || ""}
          onChange={e => setPhone(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="companyAddress">Address</label>
        <input
          id="companyAddress"
          type="text"
          autocomplete="street-address"
          value={companyAddress || ""}
          onChange={e => setCompanyAddress(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="companyCity">City</label>
        <input
          id="companyCity"
          type="text"
          value={companyCity || ""}
          onChange={e => setCompanyCity(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="companyState">State</label>
        <input
          id="companyState"
          type="text"
          value={companyState || ""}
          onChange={e => setCompanyState(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="companyZip">Zip</label>
        <input
          id="companyZip"
          type="text"
          maxlength="5"
          size="5"
          value={companyZip || ""}
          onChange={e => setCompanyZip(e.target.value)}
        />
      </div>
      {/* <label htmlFor="customers">Customers</label>
      {customers && (
        <div>
          {Object.values(customers).map(customer => (
            <>
              <input
                id={customer.id + "customerName"}
                type="text"
                key={customer.id + "name"}
                value={customer.name || ""}
                // onChange={(e) => setCustomers(e.target.value)}
                onChange={e =>
                  changeCustomerName(
                    e.target.value,
                    customer.id,
                    { customers },
                    "name"
                  )
                }
              />
              <input
                id={customer.id + "customerAddress"}
                type="text"
                key={customer.id + "address"}
                value={customer.address || ""}
                // onChange={(e) => setCustomers(e.target.value)}
                onChange={e =>
                  changeCustomerName(
                    e.target.value,
                    customer.id,
                    { customers },
                    "address"
                  )
                }
              />
            </>
          ))}
        </div>
      )} */}
      {/* <div>
        <button
          className="button block"
          onClick={() => addCustomer({ customers })}
          disabled={loading}
        >
          {loading ? "Loading ..." : "Add Customer"}
        </button>
      </div> */}

      <div>
        <button
          className=" block bg-green-200"
          onClick={() =>
            updateProfile({ username, website, avatar_url, customers, phone, company_email: companyEmail, company_address: companyAddress, city: companyCity, state: companyState, zip: companyZip })
          }
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>

      <div>
        <button
          className="button block"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div>
    </motion.div>
    </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
      <div className="flex">
      <div className="text-4xl justify-items-end transition-all ease-in-out z-100 fill-slate-800 cursor-pointer absolute left-0 ml-4">
        <div onClick={cycleOpen}>{open ? "x" : 
        <FontAwesomeIcon icon={faCircleUser}/>
       }</div>
      </div>
      <div className="w-full">
      <DashboardTabs username={username} company={website} companyPhone={phone} companyAddress={companyAddress+". "+companyCity+", "+companyState} companyEmail={companyEmail} customers={customers} documents={documents} setCustomerData={setDocuments}></DashboardTabs>
      </div>
    </div>
      </>
      
  )
}


