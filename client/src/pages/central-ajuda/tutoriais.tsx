import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Tutoriais() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Tutoriais</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Vídeos</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Tutoriais em vídeo.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Guias</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Guias passo a passo.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Exemplos</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Exemplos práticos.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Tutoriais;
export { Tutoriais }; 