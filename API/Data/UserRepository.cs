using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;
using AutoMapper;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;    
        public UserRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<MemberDto> GetMemberAsync(string username)
        {
            return await _context.Users
                .Where(user => user.UserName.Equals(username.ToLower()))
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<MemberDto>> GetMembersAsync()
        {
            return await _context.Users
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                .ToArrayAsync();
        }

        public async Task<AppUser> GetUserByIdAsync(int id) => await _context.Users.FindAsync(id);

        public async Task<AppUser> GetUserByUsernameAsync(string username) => await _context.Users.Include(p => p.Photos).SingleOrDefaultAsync(user => user.UserName.Equals(username));

        public async Task<IEnumerable<AppUser>> GetUsersAsync() 
            => await _context.Users
            .Include(p => p.Photos)
            .ToListAsync();

        public async Task<bool> SaveAllAsync() => await  _context.SaveChangesAsync() > 0;

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;

        }
    }
}
