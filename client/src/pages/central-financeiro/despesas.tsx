function Despesas() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Despesas</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Contas a Pagar</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerenciamento de contas a pagar.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Fornecedores</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Controle de fornecedores.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Relatórios</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Relatórios de despesas.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
export default Despesas;
export { Despesas }; 