using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using Domain;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;


namespace MyWebAPICore.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ValuesController : ControllerBase
    {
        private readonly DataContext _context;
        public ValuesController(DataContext context)
        {
            _context = context;
        }
        //Get api/tests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Value>>> Get()
        {
            var values =await _context.Values.ToListAsync();
            return Ok(values);
        }

        //GET api/tests/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Value>> Get(int id)
        {
            var value = await _context.Values.FindAsync(id);
            return Ok(value);
            // return "test"+id;
        }

        //POST api/tests/5
        [HttpPost]
        public void Post([FromBody] string test)
        {
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string test)
        {
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}


