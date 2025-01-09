"use client";

import { jwtDecode } from "jwt-decode";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
interface DecodedJWT {
  claims: {
    user_roles: string[];
    permissions: string[];
  };
  [key: string]: any;
}
export default function Page() {
  const [userRole, setUserRole] = useState("");
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        const jwt = jwtDecode<DecodedJWT>(session.access_token);
        setUserRole(jwt.user_roles);
      }
      console.log(session);
    });
  }, []);

  return <div>{userRole}</div>;
}
