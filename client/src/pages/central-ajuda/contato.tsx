import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Contato() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Contato</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Suporte</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Contato com suporte.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Comercial</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Contato comercial.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Parcerias</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Contato para parcerias.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Contato;
export { Contato }; 