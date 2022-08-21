import { useState, useEffect } from "react";
import { webAuth } from "../config/auth";
import { useRouter } from "next/router";

export default function UseProtect() {
    const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    if (window.location.hash) {
      webAuth.parseHash({ hash: window.location.hash }, function (
        err,
        authResult
      ) {
        if (err) {
          return console.log(err);
        }

        webAuth.client.userInfo(authResult.accessToken, function (err, user) {
          // get user info
          setUser(user);
        });
      });
    } else {
      if (user === null) {
        router.push("/");
      }
    }
  }, []);
}
