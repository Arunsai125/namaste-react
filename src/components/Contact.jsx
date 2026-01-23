const Contact = () => {
  return (
    <div className="contact m-10 p-10 text-center">
      <h1 className="msg">
        Hey Fool, This is a dummy app, How dare you to reach out to us ?
      </h1>
      <form>
        <input
          type="text"
          className="border border-black p-2 m-2"
          placeholder="name"
        ></input>
        <input
          type="text"
          className="border border-black p-2 m-2"
          placeholder="message"
        ></input>
        <button className="border border-black p-2 m-2 rounded-lg">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
