export interface MemberProfile {
  memberId: string;
  name: string;
  dob: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  zipcode: string; 
}

export const memberDB: MemberProfile[] = [
  {
    memberId: "ABC123456",
    name: "John Doe",
    dob: "01/15/1982",
    phone: "555-123-9876",
    streetAddress: "123 Elm St",
    city: "Chicago",
    state: "IL",
    zipcode: "60610"
  },
  {
    memberId: "XYZ789101",
    name: "Jane Smith",
    dob: "07/28/1975",
    phone: "555-768-4312",
    streetAddress: "456 Maple Ave", 
    city:"Evanston",
    state: "IL", 
    zipcode: "60201"
  },
];