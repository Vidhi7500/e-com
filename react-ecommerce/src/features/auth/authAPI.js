// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve) =>
    {
      const response = await fetch('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {'content-type': 'application/json'}
      });
    const data = await response.json()
    //todo
    resolve({data});
  });
}

export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try{
      const response = await fetch("/auth/login", {
      method: 'POST',
        body: JSON.stringify(loginInfo),
        headers: {'content-type': 'application/json'},
    });
    if(response.ok){
      const data = await response.json();
      resolve({ data });
    } else {
      const err = await response.text();
      reject({err});
    }

    } catch (err) {
      reject({err});
    }
    
    //todo
  });
}

export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/check");
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const err = await response.text();
        reject(err);
      }
    } catch (err) {
      reject(err);
    }

    //todo
  });
}

export function signOut(userId) {
  return new Promise(async (resolve) => {
    
    //todo
    resolve({ data: 'success' });
  });
}
