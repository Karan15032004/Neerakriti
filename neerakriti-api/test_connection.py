import os
import certifi
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()
url = os.getenv("MONGODB_URL")

# Test 1: With certifi
try:
    client = MongoClient(url, tlsCAFile=certifi.where(), serverSelectionTimeoutMS=5000)
    client.admin.command("ping")
    print("✅ Connection with certifi works!")
except Exception as e:
    print(f"❌ certifi failed: {e}")

# Test 2: With SSL disabled (temporary diagnostic only!)
try:
    client = MongoClient(url, tls=True, tlsAllowInvalidCertificates=True, serverSelectionTimeoutMS=5000)
    client.admin.command("ping")
    print("✅ Connection with tlsAllowInvalidCertificates works!")
    print("   → This means your network/firewall is blocking the SSL certificate verification.")
except Exception as e:
    print(f"❌ Even without cert verification failed: {e}")
    print("   → This means the network itself is blocking MongoDB Atlas (college firewall?).")