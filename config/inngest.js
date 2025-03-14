import { Inngest } from "inngest";
import connectDB from '@/config/db';
import User from '@/models/userModel';

// Create a client to send and receive events
export const inngest = new Inngest({ id: "debo-shop" });

// Inngest Function to save the user in database
export const syncUserCreation = inngest.createFunction(
  {
    id: 'sync-user-from-clerk'
  },
  { event: 'clerk/user.created' },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    const userData = {
      clerkId: id,
      fullName: `${first_name} ${last_name}`,
      email: email_addresses[0].email_address,
      imageUrl: image_url
    };

    await connectDB();
    await User.create(userData);
  }
);

// Inngest Function to update the user in database
export const syncUserUpdatetion = inngest.createFunction(
  {
    id: 'update-user-from-clerk'
  },
  { event: 'clerk/user.updated' },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    const userData = {
      fullName: `${first_name} ${last_name}`,
      email: email_addresses[0].email_address,
      imageUrl: image_url
    };

    await connectDB();
    
    await User.findOneAndUpdate(
      { clerkId: id },   // Find user by clerkId
      { $set: userData }, // Update user details
      { new: true, upsert: true } // Return updated document & create if not found
    );
  }
);

// Inngest  Function to delete the user from database
export const syncUserDeletion = inngest.createFunction(
  {
    id: 'delete-user-from-clerk'
  },
  { event: 'clerk/user.deleted' },
  async ({ event }) => {
    const { id } = event.data;

    await connectDB();
    
    await User.findOneAndDelete({ clerkId: id });  // Delete user by clerkId
  }
);