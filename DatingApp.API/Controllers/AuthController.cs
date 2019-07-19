using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [Microsoft.AspNetCore.Mvc.ApiController]
    public class AuthController :ControllerBase
    {
        private IAuthRepository _repo;
        private IConfiguration _config;
        private IMapper _mapper;
        public AuthController(IAuthRepository repo, IConfiguration config, IMapper mapper)
        {
            _repo = repo;
            _config = config;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegister userForRegister)
        {

            if(await _repo.UserExists(userForRegister.Username.ToLower()))
                return BadRequest("Username already exists");

            var userToCreate = _mapper.Map<User>(userForRegister);
            
           var  user =  await _repo.Register(userToCreate ,userForRegister.Password);

           var userForReturn = _mapper.Map<UserForDetailedDto>(user);
           return CreatedAtRoute("GetUser",new {controller="Users", user.Id }, userForReturn  );
        }    
        
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLogin userForLogin)
        {
            try
            {
         
            var userFromRepo = await _repo.Login(userForLogin.Username.ToLower(), userForLogin.Password);
            if(userFromRepo == null)
                return Unauthorized();

            var claims = new[]{
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.UserName)
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDiscriptor = new SecurityTokenDescriptor{ 
                Subject = new ClaimsIdentity(claims), 
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials= creds };
            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDiscriptor);

            var user = _mapper.Map<UserForListDto>(userFromRepo);
            return Ok(new { token= tokenHandler.WriteToken(token), user=user});
            }
            catch(Exception ex)
            {
                throw(ex);
            }

        }
        
    }
}