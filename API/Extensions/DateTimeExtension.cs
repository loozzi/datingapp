namespace API.Extensions
{
    public static class DateTimeExtension
    {
        public static int CalculateAge(this DateTime dateOfBirth)
        {
            DateTime now = DateTime.Now;
            int age = now.Year - dateOfBirth.Year;

            if (now.Month > dateOfBirth.Month)
                age++;

            if (now.Month == dateOfBirth.Month && now.Day > dateOfBirth.Day)
                age++;

            return age;
        }
    }
}
