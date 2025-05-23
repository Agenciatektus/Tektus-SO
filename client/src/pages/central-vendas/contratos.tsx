function Contratos() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Contratos</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Contratos em vigor.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Contratos em análise.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Histórico</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Histórico de contratos.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
export default Contratos;
export { Contratos }; 