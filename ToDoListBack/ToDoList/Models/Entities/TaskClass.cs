namespace ToDoList.Models.Entities
{
    public class TaskClass
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Status { get; set; }
    }
}
