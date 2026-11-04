const hamburger = document.querySelector(".hamburger"); // מאתר את כפתור ההמבורגר
const sideMenu = document.querySelector(".side-menu"); // מאתר את הפאנל הנפתח

hamburger.addEventListener("click", (event) => { // מאזין ללחיצה על ההמבורגר
    event.stopPropagation(); // מונע מהלחיצה להיחשב כלחיצה מחוץ לתפריט
    const isOpen = sideMenu.classList.toggle("open"); // מחליף בין מצב פתוח לסגור
    hamburger.setAttribute("aria-expanded", isOpen); // מעדכן את מצב הכפתור
});

sideMenu.addEventListener("click", (event) => { // מאזין ללחיצות בתוך הפאנל
    event.stopPropagation(); // מונע סגירה כשבוחרים קישור בתוך הפאנל
});

document.addEventListener("click", () => { // מאזין ללחיצה בכל מקום אחר בעמוד
    sideMenu.classList.remove("open"); // סוגר את הפאנל
    hamburger.setAttribute("aria-expanded", "false"); // מעדכן שהכפתור סגור
});

const roomImages = [ // רשימת התמונות לפי סדר החדרים ב-HTML
    ["images/classic room1.jpg", "images/classic room2.jpg", "images/classic room3.jpg"], // תמונות Classic Room
    ["images/exe room1.jpg", "images/exe room2.jpg", "images/exe room3.jpg"], // תמונות Executive Room
    ["images/j suite1.jpg", "images/j suite2.jpg", "images/j suite3.jpg"], // תמונות Junior Suite
    ["images/p suite1.jpg", "images/p suite2.jpg", "images/p suite3.jpg"] // תמונות Presidential Suite
]; // סוף רשימת התמונות

document.querySelectorAll(".room-gallery").forEach((gallery, index) => { // עובר על כל ארבע הגלריות
    let currentImage = 0; // מתחיל מהתמונה הראשונה בגלריה הנוכחית
    const image = gallery.querySelector(".room-image"); // מוצא את תגית התמונה בגלריה
    const prevButton = gallery.querySelector(".gallery-arrow.prev"); // מוצא את חץ התמונה הקודמת
    const nextButton = gallery.querySelector(".gallery-arrow.next"); // מוצא את חץ התמונה הבאה

    function showImage() { // פונקציה שמחליפה את התמונה המוצגת
        image.src = roomImages[index][currentImage]; // מעדכן את כתובת התמונה לפי החדר והתמונה שנבחרה
    } // סוף הפונקציה

    prevButton.addEventListener("click", () => { // מפעיל פעולה בלחיצה על החץ הקודם
        currentImage = (currentImage - 1 + roomImages[index].length) % roomImages[index].length; // עובר אחורה ומגיע לסוף אם צריך
        showImage(); // מציג את התמונה החדשה
    }); // סוף אירוע החץ הקודם

    nextButton.addEventListener("click", () => { // מפעיל פעולה בלחיצה על החץ הבא
        currentImage = (currentImage + 1) % roomImages[index].length; // עובר קדימה וחוזר להתחלה אחרי התמונה האחרונה
        showImage(); // מציג את התמונה החדשה
    }); // סוף אירוע החץ הבא
}); 

const checkIn = document.getElementById("check-in"); // מאתר את שדה תאריך הכניסה ב-HTML
const checkOut = document.getElementById("check-out"); // מאתר את שדה תאריך היציאה ב-HTML

if (checkIn && checkOut) { // בודק ששני שדות התאריך קיימים בעמוד
    const today = new Date().toISOString().split("T")[0]; // מקבל את התאריך הנוכחי בפורמט המתאים לשדה תאריך

    checkIn.min = today; // מונע בחירת תאריך כניסה מוקדם מהיום
    checkOut.min = today; // מונע בחירת תאריך יציאה מוקדם מהיום

    checkIn.addEventListener("change", () => { // מפעיל פעולה כאשר המשתמש משנה את תאריך הכניסה
        checkOut.min = checkIn.value; // מעדכן את התאריך המוקדם ביותר האפשרי ליציאה לפי תאריך הכניסה

        if (checkOut.value && checkOut.value <= checkIn.value) { // בודק אם תאריך היציאה מוקדם מתאריך הכניסה או זהה לו
            checkOut.value = ""; // מאפס את תאריך היציאה כדי שהמשתמש יבחר תאריך חדש
        }
    }); // סוף הפעולה שמתבצעת בעת שינוי תאריך הכניסה
}