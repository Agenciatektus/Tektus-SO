import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Artigos() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Artigos</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Publicados</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Artigos publicados.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Em Revisão</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Artigos em revisão.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Rascunhos</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Artigos em rascunho.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Artigos;
export { Artigos }; 