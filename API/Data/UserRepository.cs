using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;
using AutoMapper;
using API.Helpers;

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

        public async Task<PageList<MemberDto>> GetMembersAsync(UserParams userParams)
        {
            var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
            var maxDob = DateTime.Today.AddYears(-userParams.MinAge);
            var query = _context.Users.AsQueryable();

            query = query.Where(user => user.UserName != userParams.CurrentUsername);
            query = query.Where(user => user.Gender == userParams.Gender);
            query = query.Where(user => user.DateOfBirth >=  minDob && user.DateOfBirth <= maxDob);
            query = query.Include(p => p.Photos);

            query = userParams.OrderBy switch
            {
                "created" => query.OrderByDescending(u => u.Created),
                "age" => query.OrderByDescending(u => u.DateOfBirth),
                _ => query.OrderByDescending(u => u.LastActive),
            };


            return await PageList<MemberDto>.CreateAsync(
                query.ProjectTo<MemberDto>(_mapper.ConfigurationProvider).AsNoTracking(),
                userParams.PageNumber,
                userParams.PageSize
            );
        }

        public async Task<AppUser> GetUserByIdAsync(int id) => await _context.Users.FindAsync(id);

        public async Task<AppUser> GetUserByUsernameAsync(string username) => await _context.Users.Include(p => p.Photos).SingleOrDefaultAsync(user => user.UserName.Equals(username));

        public async Task<PageList<AppUser>> GetUsersAsync(UserParams userParams)
        {
            var query = _context.Users.AsQueryable();
            query = query.Include(p => p.Photos);
            query = query.ProjectTo<AppUser>(_mapper.ConfigurationProvider).AsNoTracking();


            return await PageList<AppUser>.CreateAsync(query, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<bool> SaveAllAsync() => await  _context.SaveChangesAsync() > 0;

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;

        }
    }
}
