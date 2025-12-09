"use client";

import { SignUpButton, useUser } from "@clerk/nextjs";

export default function TestClerkPage() {
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <div className="min-h-screen bg-gray-100 py-20 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-center">Test de Clerk</h1>

        {/* Estado de carga */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="font-bold mb-2">Estado:</h2>
          <p>Clerk cargado: {isLoaded ? "✅ Sí" : "❌ No"}</p>
          <p>Usuario logueado: {isSignedIn ? "✅ Sí" : "❌ No"}</p>
          {user && <p>Email: {user.primaryEmailAddress?.emailAddress}</p>}
        </div>

        {/* Botón de Sign Up con modal */}
        {!isSignedIn && (
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <h2 className="font-bold mb-4">Registro:</h2>
            <SignUpButton mode="modal">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg">
                Crear Cuenta
              </button>
            </SignUpButton>
          </div>
        )}

        {isSignedIn && (
          <div className="bg-green-100 p-4 rounded-lg">
            <p className="text-green-800 font-bold">
              ✅ ¡Clerk funciona correctamente!
            </p>
            <p>Bienvenido, {user?.firstName}</p>
          </div>
        )}
      </div>
    </div>
  );
}

