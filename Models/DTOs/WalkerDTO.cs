namespace DeshawnsDogWalking.Models.DTOs;

public class WalkerDTO
{
    public int Id {get;set;}
    public string Name {get;set;} 
    public List<WalkerCityDTO> Cities {get;set;} 
}