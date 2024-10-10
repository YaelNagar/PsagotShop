

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('chosenTypeId').addEventListener('change', function () {
        const selectedValue = this.value;

        // קישור אל הקישור המתאים
        if (selectedValue === 'craft') {
            window.location.href = 'craft'; // אם מדובר בכלי כתיבה
        } else if (selectedValue === 'notebooks') {
            window.location.href = 'notebooks'; // אם מדובר במחברות
        }
    });
});
