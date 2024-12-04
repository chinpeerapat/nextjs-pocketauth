import PocketBase from 'pocketbase';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const {
  NEXT_PUBLIC_POCKETBASE_URL,
  POCKETBASE_ADMIN_EMAIL,
  POCKETBASE_ADMIN_PASSWORD,
} = process.env;

if (!POCKETBASE_ADMIN_EMAIL || !POCKETBASE_ADMIN_PASSWORD) {
  console.error('❌ Missing required environment variables');
  process.exit(1);
}

async function setupDatabase() {
  const pb = new PocketBase(NEXT_PUBLIC_POCKETBASE_URL);
  
  try {
    // Create admin user if it doesn't exist
    try {
      await pb.admins.create({
        email: POCKETBASE_ADMIN_EMAIL,
        password: POCKETBASE_ADMIN_PASSWORD,
        passwordConfirm: POCKETBASE_ADMIN_PASSWORD,
      });
      console.log('✅ Admin user created successfully');
    } catch (error) {
      console.log('ℹ️ Admin user already exists');
    }

    // Create users collection if it doesn't exist
    try {
      await pb.collections.create({
        name: 'users',
        type: 'auth',
        schema: [
          {
            name: 'name',
            type: 'text',
            required: true,
          },
          {
            name: 'avatar',
            type: 'text',
            required: false,
          }
        ],
        options: {
          allowEmailAuth: true,
          allowOAuth2Auth: false,
          allowUsernameAuth: false,
          exceptEmailDomains: null,
          minPasswordLength: 8,
          onlyEmailDomains: null,
        },
      });
      console.log('✅ Users collection created successfully');
    } catch (error) {
      console.log('ℹ️ Users collection already exists');
    }

    console.log('🚀 Database setup completed successfully');
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();