using System.Text;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using miniProjectAPI.Context;
using miniProjectAPI.Helpers;
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

            var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.UserName == userObj.UserName);
            if (user == null)
            {
                return NotFound(new { Message = "User Not Found" });
            }
            if (!PasswordHasher.VerifyPassword(userObj.Password, user.Password))
            {
                return BadRequest(new { Massage = "Password Is Incorrect" });
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

            if (await CheckUserNameExistAsync(userObj.UserName))
            {
                return BadRequest(new { Message = "Username Already Exist!" });
            }

            if (await CheckEmailExistAsync(userObj.Email))
            {
                return BadRequest(new { Message = "Email Already Exist!" });
            }

            var pass = CheckPasswordStrength(userObj.Password);
            if (!string.IsNullOrEmpty(pass))
            {
                return BadRequest(new { Message = pass });
            }

            userObj.Password = PasswordHasher.HashPassword(userObj.Password);
            userObj.Role = "User";
            userObj.Token = "";
            await _dbContext.Users.AddAsync(userObj);
            await _dbContext.SaveChangesAsync();
            return Ok(new { Message = "User Registered!" });
        }

        private async Task<bool> CheckUserNameExistAsync(string username) 
        {
            return await _dbContext.Users.AnyAsync(x => x.UserName == username);
        }

        private async Task<bool> CheckEmailExistAsync(string email) 
        {
            return await _dbContext.Users.AnyAsync(x => x.Email == email);
        }

        private string CheckPasswordStrength(string password) 
        {
            StringBuilder sb = new StringBuilder();
            if (password.Length < 8)
            {
                sb.Append("Minimum password length should be 8. " + Environment.NewLine);
            }
            if (!(Regex.IsMatch(password, "[a-zA-Z]") && Regex.IsMatch(password, "[0-9]")))
            {
                sb.Append("Password should be Alphanumeric. " + Environment.NewLine);
            }
            if (!Regex.IsMatch(password, "[^a-zA-Z0-9]"))
            {
                sb.Append("Password should contain special chars. ");
            }

            return sb.ToString();
        }
    }
}
