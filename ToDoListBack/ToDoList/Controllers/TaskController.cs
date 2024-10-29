using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoList.Data;
using ToDoList.Models;
using ToDoList.Models.Entities;

namespace ToDoList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController(ApplicationDbContext dbContext) : ControllerBase
    {
        private ApplicationDbContext dbContext = dbContext;

        [HttpGet]
        public IActionResult GetAllTasks()
        {
            var tasks = dbContext.Tasks.ToList();

            return Ok(tasks);

        }

        [HttpPost]
        public IActionResult AddTask(AddNewTaskDto addNewTaskDto)
        {
            var task = new TaskClass() { Name = addNewTaskDto.Name, Status = addNewTaskDto.Status };
            dbContext.Tasks.Add(task);
            dbContext.SaveChanges();
            return Ok(task);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public IActionResult DeleteTask(Guid id)
        {
            var task = dbContext.Tasks.Find(id);
            if (task == null)
            {
                return NotFound();
            }
            dbContext.Tasks.Remove(task);
            dbContext.SaveChanges();
            return Ok();
        }
        [HttpPut]
        [Route("{id:Guid}")]
        public IActionResult UpdateTask(Guid id, UpdateTaskDto updateTaskDto)
        {
           var task= dbContext.Tasks.Find(id);
            if (task == null)
            {
                return NotFound();
            }
                task.Name = updateTaskDto.Name;
                task.Status = updateTaskDto.Status;
                dbContext.Tasks.Update(task);
                dbContext.SaveChanges();

            return Ok();
        }
    }
}
