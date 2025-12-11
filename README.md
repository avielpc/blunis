# BLUNIS - בוט חשבוניות חכם

אתר BLUNIS - בוט חכם לניהול חשבוניות, דוחות וחשבונאות.

## הגדרת GitHub Pages

### שלב 1: יצירת Repository ב-GitHub

1. היכנס ל-GitHub ויצור repository חדש
2. תן לו שם (למשל: `webBlunis`)
3. אל תסמן "Initialize with README" (כי יש לך כבר קבצים)

### שלב 2: העלאת הקבצים ל-GitHub

אם יש לך Git מותקן, הרץ את הפקודות הבאות:

```bash
cd c:\Users\Aviel\cursorProjects\webBlunis
git init
git add .
git commit -m "Initial commit - BLUNIS website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/webBlunis.git
git push -u origin main
```

**החלף `YOUR_USERNAME` בשם המשתמש שלך ב-GitHub**

### שלב 3: הפעלת GitHub Pages

1. היכנס ל-repository ב-GitHub
2. לחץ על **Settings** (הגדרות)
3. בתפריט השמאלי, לחץ על **Pages**
4. תחת **Source**, בחר **Deploy from a branch**
5. בחר את ה-branch **main** ואת התיקייה **/ (root)**
6. לחץ **Save**

### שלב 4: הגדרת DNS

לאחר שהאתר יעלה (יכול לקחת כמה דקות), תצטרך להגדיר את ה-DNS:

1. היכנס לפאנל הניהול של הדומיין שלך (`avielpc.com`)
2. הוסף רשומה מסוג **CNAME**:
   - **Name/Host**: `blunis`
   - **Value/Target**: `YOUR_USERNAME.github.io` (החלף ב-username שלך)
   - **TTL**: 3600 (או ברירת מחדל)

**או** אם אתה משתמש ב-subdomain:
   - **Name/Host**: `blunis.avielpc.com`
   - **Value/Target**: `YOUR_USERNAME.github.io`

### הערות חשובות:

- קובץ `CNAME` חייב להיות בתיקיית השורש של הפרויקט (כבר קיים)
- `index.html` הוא הדף הראשי - GitHub Pages מזהה אותו אוטומטית
- דפי המשנה (jobs.html, pricing.html וכו') יעבדו אוטומטית
- לאחר ההעלאה, האתר יהיה זמין בכתובת: `https://blunis.avielpc.com`

### בדיקת האתר

לאחר ההגדרה, בדוק שהאתר עובד:
- `https://YOUR_USERNAME.github.io/webBlunis` (כתובת זמנית)
- `https://blunis.avielpc.com` (לאחר הגדרת DNS)

## מבנה האתר

- `index.html` - דף הבית
- `jobs.html` - דף משרות
- `pricing.html` - דף תמחור
- `reviews.html` - דף ביקורות
- `join.html` - דף הצטרפות
- `examples.html` - דף דוגמאות
- `images/` - תמונות
- `logo/` - לוגו
- `source/` - קבצי JSON עם נתונים
