@echo off
setlocal
echo Starting Employee Management System (Fully Self-Contained)...

:: 1. Setup Java (Portable JDK 17)
set "JAVA_HOME=%~dp0jdk"
set "PATH=%JAVA_HOME%\bin;%PATH%"

:: 2. Setup Maven (Portable)
set "MAVEN_HOME=%~dp0maven"
set "PATH=%MAVEN_HOME%\bin;%PATH%"

:: Debug Info
echo JAVA_HOME: %JAVA_HOME%
java -version
javac -version
echo MAVEN_HOME: %MAVEN_HOME%
call mvn -version

:: 3. Run Application
echo.
echo Launching Application...
echo Please wait. The first launch may take 1-2 minutes to download dependencies.
echo.
call mvn spring-boot:run
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Application failed to start.
    echo Make sure you are connected to the internet for the first run.
    pause
    exit /b %errorlevel%
)
pause
