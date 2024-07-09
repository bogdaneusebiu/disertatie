using System.Security.Claims;
using API.DTO;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController 
    {
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;
        public OrdersController(IOrderService orderService, IMapper mapper)
        {
            _mapper = mapper;
            _orderService = orderService;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(OrderDto orderDto)
        {
            var email = HttpContext.User.FindFirstValue(ClaimTypes.Email);

            var address = _mapper.Map<AddressDto, Address>(orderDto.ShippingAddress);
            var order = await _orderService.CreateOrderAsync(email, orderDto.DeliveryMethodId, orderDto.BasketId, address);

            if(order == null) return BadRequest(new ApiResponse(400,"Problem creating order"));

            return Ok(order);
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<OrderToReturnDto>>> GetOrdersForUser()
        {
            var email = HttpContext.User.FindFirstValue(ClaimTypes.Email);

            var orders = await _orderService.GetOrdersForUserAsync(email);

            return Ok(_mapper.Map<IReadOnlyList<Order>, IReadOnlyList<OrderToReturnDto>>(orders));
        }

        [Authorize(Policy = "RequireAdministratorRole")]
        [HttpGet("orderHistory")]
        public async Task<ActionResult<IReadOnlyList<OrderToReturnDto>>> GetOrders()
        {
            var orders = await _orderService.GetOrdersAsync();

            return Ok(_mapper.Map<IReadOnlyList<Order>, IReadOnlyList<OrderToReturnDto>>(orders));
        }

        [Authorize(Policy = "RequireAdministratorRole")]
        [HttpGet("orderHistory/{id}")]
        public async Task<ActionResult<OrderToReturnDto>> GetOrdersById(int id)
        {
            var orders = await _orderService.GetAnyOrderByIdAsync(id);

            return Ok(_mapper.Map<Order, OrderToReturnDto>(orders));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderToReturnDto>> GetOrderByIdForUser(int id)
        {
            var email = HttpContext.User.FindFirstValue(ClaimTypes.Email);

            var order = await _orderService.GetOrderByIdAsync(id, email);

            if(order == null) return NotFound(new ApiResponse(404));

            return Ok(_mapper.Map<Order, OrderToReturnDto>(order));
        }

        [HttpGet("deliveryMethods")]
        public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryMethods()
        {
            return Ok(await _orderService.GetDeliveryMethodsAsync());
        }
    }
}