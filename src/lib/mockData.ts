export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
  avatarInitials: string;
}

export interface LabTestReport {
  batchCode: string;
  mfgDate: string;
  expDate: string;
  analysisDate: string;
  withanolides: string; // e.g. "5.24% (Target: >= 5.0%)"
  piperine: string; // e.g. "5.12mg (Target: 5.0mg)"
  heavyMetals: {
    status: 'PASS' | 'FAIL';
    lead: string;
    cadmium: string;
    mercury: string;
    arsenic: string;
  };
  microbial: {
    status: 'PASS' | 'FAIL';
    salmonella: string;
    ecoli: string;
    yeastMold: string;
  };
  organicPurity: string; // e.g. "99.8% Certified Organic"
  certifiedFacility: string; // e.g. "cGMP Compliant"
  certificateUrl: string;
}

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "review-1",
    name: "Mahendra K.",
    rating: 5,
    text: "Absolutely wonderful. After trying regular ashwagandha powders, the standardized extract from Vedah Vital showed noticeable improvements in my stress levels and sleep quality within two weeks. High-quality packaging too.",
    date: "2026-05-18",
    verified: true,
    avatarInitials: "MK"
  },
  {
    id: "review-2",
    name: "Rahul S.",
    rating: 5,
    text: "It is a highly effective, premium supplement. I've been using it for a month now. Definitely can feel the difference in recovery and daily energy. The black pepper extract helps absorption, no stomach issues at all.",
    date: "2026-05-24",
    verified: true,
    avatarInitials: "RS"
  },
  {
    id: "review-3",
    name: "Santosh D.",
    rating: 5,
    text: "Excellent purity. The batch code verification is a game changer for transparency. Knowing exactly what goes into my body gives me peace of mind. Strongly recommend this to anyone looking for genuine Ayurveda.",
    date: "2026-06-01",
    verified: true,
    avatarInitials: "SD"
  },
  {
    id: "review-4",
    name: "Sam Wilson",
    rating: 5,
    text: "Very satisfied with the results. Quality packaging and fast delivery. My sleep support has improved significantly, and I feel much more calm and centered during high-stress workdays.",
    date: "2026-04-12",
    verified: true,
    avatarInitials: "SW"
  },
  {
    id: "review-5",
    name: "John Doe",
    rating: 4,
    text: "Great product! Highly recommend it. The standardization to 5% withanolides makes a massive difference compared to generic root powders. The capsules are easy to swallow and completely vegan.",
    date: "2026-05-02",
    verified: true,
    avatarInitials: "JD"
  },
  {
    id: "review-6",
    name: "Priya Nair",
    rating: 5,
    text: "Outstanding quality. As someone who studies Ayurveda, I appreciate the root-only formulation without leaves. This is authentic wellness done right, backed by lab science.",
    date: "2026-06-04",
    verified: true,
    avatarInitials: "PN"
  }
];

export const LAB_REPORTS: Record<string, LabTestReport> = {
  "VV-ASH-2026-001": {
    batchCode: "VV-ASH-2026-001",
    mfgDate: "2026-05-10",
    expDate: "2028-05-09",
    analysisDate: "2026-05-12",
    withanolides: "5.24% (Target: >= 5.0% by HPLC)",
    piperine: "5.12mg (Target: 5.0mg)",
    heavyMetals: {
      status: "PASS",
      lead: "<0.05 ppm (Limit: <0.5 ppm)",
      cadmium: "<0.02 ppm (Limit: <0.3 ppm)",
      mercury: "<0.01 ppm (Limit: <0.1 ppm)",
      arsenic: "<0.05 ppm (Limit: <0.5 ppm)"
    },
    microbial: {
      status: "PASS",
      salmonella: "Absent / 10g",
      ecoli: "Absent / 10g",
      yeastMold: "<10 CFU/g (Limit: <100 CFU/g)"
    },
    organicPurity: "99.8% Certified Organic Ashwagandha Root",
    certifiedFacility: "cGMP Certified & FDA Registered Facility",
    certificateUrl: "#"
  },
  "VV-ASH-2026-002": {
    batchCode: "VV-ASH-2026-002",
    mfgDate: "2026-06-01",
    expDate: "2028-05-31",
    analysisDate: "2026-06-03",
    withanolides: "5.18% (Target: >= 5.0% by HPLC)",
    piperine: "5.08mg (Target: 5.0mg)",
    heavyMetals: {
      status: "PASS",
      lead: "<0.04 ppm (Limit: <0.5 ppm)",
      cadmium: "<0.02 ppm (Limit: <0.3 ppm)",
      mercury: "<0.01 ppm (Limit: <0.1 ppm)",
      arsenic: "<0.04 ppm (Limit: <0.5 ppm)"
    },
    microbial: {
      status: "PASS",
      salmonella: "Absent / 10g",
      ecoli: "Absent / 10g",
      yeastMold: "<10 CFU/g (Limit: <100 CFU/g)"
    },
    organicPurity: "99.9% Certified Organic Ashwagandha Root",
    certifiedFacility: "cGMP Certified & FDA Registered Facility",
    certificateUrl: "#"
  }
};
