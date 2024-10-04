import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import SignaturesSection from '../../../components/letters/signatureSection/signatureSection';

const NonDisclosureAgreement = () => {
  const sections = [
    {
      title: "1. Definition of Confidential Information.",
      content:
        "For purposes of this Agreement, 'Confidential Information' shall include all information or material that has or could have commercial value or other utility in the business in which Disclosing Party is engaged. If Confidential Information is in written form, the Disclosing Party shall label or stamp the materials with the word 'Confidential' or some similar warning. If Confidential Information is transmitted orally, the Disclosing Party shall promptly provide a writing indicating that such oral communication constituted Confidential Information."
    },
    {
      title: "2. Exclusions from Confidential Information.",
      content:
        "Receiving Party's obligations under this Agreement do not extend to information that is: (a) publicly known at the time of disclosure or subsequently becomes publicly known through no fault of the Receiving Party; (b) discovered or created by the Receiving Party before disclosure by Disclosing Party; (c) learned by the Receiving Party through legitimate means other than from the Disclosing Party or Disclosing Party's representatives; or (d) is disclosed by Receiving Party with Disclosing Party's prior written approval."
    },
    {
      title: "3. Obligations of Receiving Party.",
      content:
        "Receiving Party shall hold and maintain the Confidential Information in strictest confidence for the sole and exclusive benefit of the Disclosing Party. Receiving Party shall carefully restrict access to Confidential Information to employees, contractors, and third parties as is reasonably required and shall require those persons to sign nondisclosure restrictions at least as protective as those in this Agreement. Receiving Party shall not, without prior written approval of Disclosing Party, use for Receiving Party's own benefit, publish, copy, or otherwise disclose to others, or permit the use by others for their benefit or to the detriment of Disclosing Party, any Confidential Information. Receiving Party shall return to Disclosing Party any and all records, notes, and other written, printed, or tangible materials in its possession pertaining to Confidential Information immediately if Disclosing Party requests it in writing."
    },
    {
      title: "4. Time Periods.",
      content:
        "The nondisclosure provisions of this Agreement shall survive the termination of this Agreement and Receiving Party's duty to hold Confidential Information in confidence shall remain in effect until the Confidential Information no longer qualifies as a trade secret or until Disclosing Party sends Receiving Party written notice releasing Receiving Party from this Agreement, whichever occurs first."
    },
    {
      title: "5. Relationships.",
      content:
        "Nothing contained in this Agreement shall be deemed to constitute either party a partner, joint venture, or employee of the other party for any purpose."
    },
    {
      title: "6. Severability.",
      content:
        "If a court finds any provision of this Agreement invalid or unenforceable, the remainder of this Agreement shall be interpreted so as best to affect the intent of the parties."
    },
    {
      title: "7. Integration.",
      content:
        "This Agreement expresses the complete understanding of the parties with respect to the subject matter and supersedes all prior proposals, agreements, representations, and understandings. This Agreement may not be amended except in a writing signed by both parties."
    },
    {
      title: "9. Waiver.",
      content:
        "The failure to exercise any right provided in this Agreement shall not be a waiver of prior or subsequent rights."
    },
    {
      title: "Signing Section",
      content:
        "By signing in the space provided below, the receiving party acknowledges that they have read carefully and had the opportunity to consult with legal counsel regarding the provisions of this Section. This Agreement and each party's obligations shall be binding on the representatives, assigns, and successors of such party. Each party has signed this Agreement through its authorized representative."
    }
  ]
  return (
    <div>
      <Typography sx={{mb:1}} variant={"h4"}>Non Disclure Agreegment</Typography>
      {sections.map((section, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {section.title}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            {section.content}
          </Typography>
        </Box>
      ))}
      <SignaturesSection client={"Disclosing Party"} />
      <SignaturesSection client={"Receiving Party"} />
    </div>
  );
};

export default NonDisclosureAgreement;
