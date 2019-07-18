using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
namespace DatingApp.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
            _context = context;

        }
        public  async Task<User> Login(string username, string password)
        {
           var user =  await  _context.Users.Include(p=>p.Photos).FirstOrDefaultAsync(x=>x.UserName == username);   

            if(user == null)
                return null;

             if(!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt)) 
                return null;

            return user;
            //throw new System.NotImplementedException();
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using( var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length ; i++)
                {
                        if(passwordHash[i] != computedHash[i])
                        {
                            return false;
                        }
                }
            }
            return true;
            
            //throw new NotImplementedException();
        }

        public async Task<User> Register(User user, string password)
        {
            //throw new System.NotImplementedException();
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using( var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
            //throw new NotImplementedException();
        }

        public async Task<bool> UserExists(string username)
        {
            if(await _context.Users.AnyAsync(x=>x.UserName.ToLower().Equals(username.ToLower())) )
                return true;
           return false;     

        }
    }
}