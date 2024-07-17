FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 5000
EXPOSE 5001

ENV ASPNETCORE_URLS=https://+5001

FROM mcr.microsoft.com/dotnet/sdk:8.0 as build
ARG BUILD_CONFIGURATION=Release

WORKDIR /src

COPY ["API/API.csproj", "API/"]
COPY ["Core/Core.csproj", "Core/"]
COPY ["Infrastructure/Infrastructure.csproj", "Infrastructure/"]

RUN dotnet restore "API/API.csproj"
COPY . .
WORKDIR "/src/API"

RUN dotnet build "./API.csproj" -c Release -o /app/publish

FROM build as publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./API.csproj" -c $BUILD_CONFIGURATION -o /app/publish

FROM base as final
WORKDIR /app
COPY --from=publish /app/publish .

ENV ConnectionStrings__DefaultConnection = "Server=localhost; Port=5432; User Id=appuser; Password=secret; Database=georgi"
ENV ConnectionStrings__IdentityConnection = "Server=localhost; Port=5432; User Id=appuser; Password=secret; Database=identity"
ENV ENV ConnectionStrings__Redis = "localhost"

ENTRYPOINT [ "dotnet", "API.dll"]