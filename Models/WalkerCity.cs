namespace DeshawnsDogWalking.Models;
public class WalkerCity
{
    public int Id {get;set;}
    public int WalkerId {get;set;}
    public Walker Walker {get;set;}
    public int CityId {get;set;}
    public City City {get;set;}
}