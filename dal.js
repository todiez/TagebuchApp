const url = `/account/create/${name}/${email}/${password}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
    } catch (error) {
      alert("Email address is already in use");
      return;
    }