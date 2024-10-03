import Member from "../model/member.js";

// Retrieve member by phone number
export const getMemberByPhoneNumber = async (phoneNumber) => {
  const member = await Member.findOne({ phoneNumber });
  return member;
};

// Create a new member in the database
export const createNewMember = async (memberData) => {
  await Member.create(memberData);
};

// Update member's information using their phone number
export const findMemberAndUpdate = async (phoneNumber, memberUpdatedData) => {
  await Member.findOneAndUpdate({ phoneNumber }, memberUpdatedData);
};

// Get all members with active status
export const getAllActiveMembers = async () => {
  const activeMembers = await Member.find({ isActive: true });
  return activeMembers;
};

// Get all members with inactive status
export const getAllInactiveMembers = async () => {
  const inactiveMembers = await Member.find({ isActive: false });
  return inactiveMembers;
};

// Mark a member as inactive by their phone number
export const markMemberAsInactive = async (phoneNumber) => {
  await Member.findOneAndUpdate({ phoneNumber }, { isActive: false });
};