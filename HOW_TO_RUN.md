# 🚀 How to Run This Project

## Step 1: Install Requirements

You need these three things:

1. **Java 17** - Download from https://adoptium.net/
2. **Maven** - Download from https://maven.apache.org/download.cgi
3. **Node.js** - Download from https://nodejs.org/

Verify installations:
```bash
java -version    # Should show Java 17 or higher
mvn -version     # Should show Maven 3.6 or higher
node -v          # Should show Node 16 or higher
```

---

## Step 2: Start the Backend

Open Command Prompt or Terminal:

```bash
cd task-management-system/backend
mvn spring-boot:run
```

**Wait for this message**: `Started TaskManagementApplication`

**Test**: Open http://localhost:8080/api/swagger-ui.html in browser

---

## Step 3: Start the Frontend

Open a **NEW** Command Prompt or Terminal:

```bash
cd task-management-system/frontend
npm install
npm run dev
```

**Wait for this message**: `Local: http://localhost:3000`

**Test**: Open http://localhost:3000 in browser

---

## Step 4: Use the App

1. Go to http://localhost:3000
2. Click **"Sign up"**
3. Fill the form (choose "User" or "Admin" role)
4. Click **"Login"**
5. Start creating tasks!

---

## 📝 Test Accounts

Create these for testing:

**Regular User:**
- Username: `user1`
- Password: `password123`
- Role: User

**Admin User:**
- Username: `admin1`
- Password: `password123`
- Role: Admin

---

## 🐛 Problems?

**Backend won't start?**
- Make sure Java 17 is installed
- Make sure port 8080 is not already used

**Frontend won't start?**
- Delete `frontend/node_modules` folder
- Run `npm install` again in frontend folder

**"Connection refused" error?**
- Make sure backend is running first
- Check http://localhost:8080/api/swagger-ui.html works

---

## 📱 What to Access

1. **Frontend App**: http://localhost:3000
2. **API Docs (Swagger)**: http://localhost:8080/api/swagger-ui.html
3. **Database Console**: http://localhost:8080/api/h2-console
   - JDBC URL: `jdbc:h2:mem:taskdb`
   - Username: `sa`
   - Password: (leave empty)

---

## 🎯 What You Can Do

✅ Register new users  
✅ Login with JWT authentication  
✅ Create tasks  
✅ Edit tasks  
✅ Delete tasks  
✅ View all tasks (Admin only)  
✅ Delete any task (Admin only)  

---

## 📚 API Testing

Use **Swagger UI** or **Postman**:

**Swagger**: http://localhost:8080/api/swagger-ui.html

**Postman**: Import `Task-Management-API.postman_collection.json`

---

## 🛑 Stop the App

Press `Ctrl + C` in both terminal windows (backend and frontend)

---

That's it! Simple and easy. 🎉
