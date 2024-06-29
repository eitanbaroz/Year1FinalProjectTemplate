using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Net;
using System.Reflection.Metadata;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Microsoft.Extensions.DependencyModel.Resolution;
using UUIDNext;
using static Project.Utils;

namespace Project;

class Program
{
  static void Main()
  {
    /*───────────────────────────╮
    │ Creating the server object │
    ╰───────────────────────────*/
    var server = new HttpListener();
    server.Prefixes.Add("http://*:5000/");
    server.Start();

    Console.WriteLine("Server started. Listening for requests...");
    Console.WriteLine("Main page on http://localhost:5000/website/index.html");


    /*─────────────────────────────────────╮
    │ Creating the database context object │
    ╰─────────────────────────────────────*/
    var database = new Database();


    /*─────────────────────────╮
    │ Processing HTTP requests │
    ╰─────────────────────────*/
    while (true)
    {
      /*────────────────────────────╮
      │ Waiting for an HTTP request │
      ╰────────────────────────────*/
      var serverContext = server.GetContext();
      var response = serverContext.Response;

      try
      {
        /*────────────────────────╮
        │ Handeling file requests │
        ╰────────────────────────*/
        serverContext.ServeFiles();

        /*───────────────────────────╮
        │ Handeling custome requests │
        ╰───────────────────────────*/
        HandleRequests(serverContext, database);

        /*───────────────────────────────╮
        │ Saving changes to the database │
        ╰───────────────────────────────*/
        database.SaveChanges();

      }
      catch (Exception e)
      {
        Console.ForegroundColor = ConsoleColor.Red;
        Console.WriteLine(e);
        Console.ResetColor();
      }

      /*───────────────────────────────────╮
      │ Sending the response to the client │
      ╰───────────────────────────────────*/
      response.Close();
    }
  }

  static void HandleRequests(HttpListenerContext serverContext, Database database)
  {
    var request = serverContext.Request;
    var response = serverContext.Response;

    string absPath = request.Url!.AbsolutePath;

    if (absPath == "/signUp")
    {
      (string username, string password) = request.GetBody<(string, string)>();

      var userId = Uuid.NewDatabaseFriendly(UUIDNext.Database.SQLite).ToString();

      var user = new User(userId, username, password);
      database.Users.Add(user);

      response.Write(userId);
      Console.Write("signup");
    }

    else if (absPath == "/logIn")
    {
      (string username, string password) = request.GetBody<(string, string)>();

      User user = database.Users.First(
        u => u.Username == username && u.Password == password
      )!;

      Console.WriteLine(user.Username + " " + user.Password);

      response.Write(user.Id);

    }

    else if (absPath == "/addTask")
    {
      (string title, string date, string description, string userId, bool done) =
        request.GetBody<(string, string, string, string, bool)>();

      Task task = new Task(title, date, description, userId, done);

      database.Tasks.Add(task);
    }



    else if (absPath == "/getPreviews")
    {
      string id = request.GetBody<string>();

      var previews = database.Tasks.ToArray();

      Task[] filteredArray = [];
      for (int i = 0; i < previews.Length; i++)
      {
        if (previews[i].UserId == id)
        {
          filteredArray = [.. filteredArray, previews[i]];
        }
      }
      response.Write(filteredArray);

    }

    else if (absPath == "/done")
    {
      int id = request.GetBody<int>();
      Task task = database.Tasks.Find(id)!;
      task.Done = true;
    }
  }
}


class User(string id, string username, string password)
{
  [Key]
  public string Id { get; set; } = id;
  public string Username { get; set; } = username;
  public string Password { get; set; } = password;
}

class Database : DbContextWrapper
{
  public DbSet<User> Users { get; set; }
  public DbSet<Task> Tasks { get; set; }

  public Database() : base("Database") { }
}

class Task(string title, string date, string description, string userId, bool done)
{
  [Key]
  public int Id { get; set; }
  public string Title { get; set; } = title;
  public string date { get; set; } = date;
  public string Description { get; set; } = description;
  public string UserId { get; set; } = userId;

  [ForeignKey("UserId")]
  public User? User { get; set; }

  public bool Done { get; set; } = done;
}
