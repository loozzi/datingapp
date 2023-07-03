namespace API.Helpers
{
    public class PaginationHeader
    {
        public PaginationHeader(
            int currentPage, 
            int itemsPerPage, 
            int totalItems, 
            int pagePages)
        {
            CurrentPage = currentPage;
            ItemsPerPage = itemsPerPage;
            TotalItems = totalItems;
            PagePages = pagePages;
        }

        public int CurrentPage { get; set; }
        public int ItemsPerPage { get; set; }
        public int TotalItems { get; set; }
        public int PagePages { get; set; }
    }
}
