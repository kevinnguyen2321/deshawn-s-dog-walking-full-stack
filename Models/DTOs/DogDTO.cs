namespace DeshawnsDogWalking.Models.DTOs;

public class DogDTO
{
    public int Id {get;set;}
    public string Name {get;set;}
    public int CityId {get;set;}
    public CityDTO City {get;set;}
    public int? WalkerId {get;set;}
    public WalkerDTO Walker {get;set;}
    
}