import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function DocumentosSocial() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Documentos - Social</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Biblioteca de Conteúdo</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Documentos e materiais de conteúdo.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Modelos de documentos para redes sociais.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Guias</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Guias e manuais de publicação.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DocumentosSocial;
export { DocumentosSocial }; 