import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Usuarios() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Usuários</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Perfis</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerenciamento de perfis.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Permissões</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Configuração de permissões.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Grupos</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerenciamento de grupos.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Usuarios;
export { Usuarios }; 