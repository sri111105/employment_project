# How to Run in Eclipse IDE

Follow these steps to import and run the project in Eclipse.

## 1. Import the Project
1. Open Eclipse.
2. Go to **File** > **Import...**
3. Select **Maven** > **Existing Maven Projects** and click **Next**.
4. Click **Browse...** and select your project folder:
   `c:\Users\srivi\OneDrive\Desktop\emplyment_01`
5. Ensure the `pom.xml` box is checked.
6. Click **Finish**.

*Note: You will see a progress bar in the bottom right corner labeled "Building workspace" or "Downloading sources". Wait for this to finish.*

## 2. Verify Java Configuration
Since this project works best with Java 1.8 or higher, ensure Eclipse is using a correct JDK.
1. Right-click the project (`management`) in the **Package Explorer**.
2. Go to **Build Path** > **Configure Build Path...**.
3. Go to the **Libraries** tab.
4. If you see a red "Unbound" error or an old JRE:
   - Select the "JRE System Library".
   - Click **Edit...**
   - Select **Workspace default JRE** (if it is Java 8 or 17) or **Alternate JRE** and select a valid JDK.
   - *Tip: You can use the `jdk` folder inside this project if you don't have one installed elsewhere.*

## 3. Update Maven (If user sees errors)
If you see red 'X' marks on the project:
1. Right-click the project > **Maven** > **Update Project...**
2. Check **Force Update of Snapshots/Releases**.
3. Click **OK**.

## 4. Run the Application
1. Navigate to:
   `src/main/java/com/employee/management/EmployeeManagementApplication.java`
2. Right-click the file > **Run As** > **Java Application**.
3. The **Console** tab at the bottom will show the logs (similar to the black window).
4. Once you see `Tomcat started on port(s): 8080`, open your browser.

## 5. Access the App
Go to: [http://localhost:8080](http://localhost:8080)
