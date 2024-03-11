using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using miniProjectAPI.Context;
using miniProjectAPI.Models;

namespace miniProjectAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _dbContext;
        public UserController(AppDbContext appDbContext)
        {
            _dbContext = appDbContext;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User userObj)
        {
            if (userObj == null)
            {
                return BadRequest();
            }

            var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.UserName == userObj.UserName && x.Password == userObj.Password);
            if (user == null)
            {
                return NotFound(new { Message = "User Not Found" });
            }

            return Ok(new { Message = "Login Success!" });
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] User userObj)
        {
            if (userObj == null)
            {
                return BadRequest();
            }

            await _dbContext.Users.AddAsync(userObj);
            await _dbContext.SaveChangesAsync();
            return Ok(new { Message = "User Registered!" });
        }
    }
}
