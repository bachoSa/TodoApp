namespace ToDoList.Models
{
    public class UpdateTaskDto
    {
        public required string Name { get; set; }
        public required string Status { get; set; }
    }
}
