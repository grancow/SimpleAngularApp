# Aplikacja Angular z Autoryzacją

Aplikacja demonstracyjna zaimplementowana w Angular, prezentująca mechanizm autoryzacji, zarządzanie sesją użytkownika oraz zabezpieczenie tras w aplikacji.

## Wymagania

- Node.js (wersja 16 lub wyższa)
- npm (wersja 8 lub wyższa)
- Angular CLI (wersja 16 lub wyższa)

## Instalacja

1. Sklonuj repozytorium:
```bash
git clone [adres-repozytorium]
cd auth-angular-app
```

2. Zainstaluj zależności:
```bash
npm install
```

3. Uruchom aplikację:
```bash
ng serve
```

Aplikacja będzie dostępna pod adresem `http://localhost:4200`

## Struktura Aplikacji

```
src/
├── app/
│   ├── components/          # Komponenty wielokrotnego użytku
│   │   └── continue-button/ # Komponent przycisku logowania
│   │
│   ├── core/               # Rdzeń aplikacji
│   │   ├── models/         # Interfejsy i typy
│   │   └── menu.service.ts # Serwis do zarządzania menu
│   │
│   ├── layouts/            # Układy strony
│   │   └── app-layout/     # Główny układ z menu
│   │
│   ├── pages/              # Komponenty stron
│   │   ├── home/          # Strona główna
│   │   └── no-access/     # Strona braku dostępu
│   │
│   ├── state/             # Zarządzanie stanem (NgRx)
│   │   └── auth/          # Stan autoryzacji
│   │
│   ├── guards/            # Strażnicy routingu
│   │   ├── auth.guard.ts  # Sprawdzanie autoryzacji
│   │   └── role.guard.ts  # Sprawdzanie ról
│   │
│   └── app.routes.ts      # Konfiguracja routingu
```

## Technologie

- Angular 16+
- NgRx (State Management)
- SCSS + BEM (Stylizacja)
- Angular Material (Komponenty UI)

## Struktura Sesji Użytkownika

```typescript
{
  "user": {
    "id": 1,
    "name": "Jan Kowalski",
    "roles": ["user", "admin"]
  },
  "token": "mocked-jwt-token"
}
```

## Przykładowa Struktura Menu

```typescript
[
  {
    "label": "Dashboard",
    "path": "/app/dashboard",
    "roles": ["user", "admin"]
  },
  {
    "label": "Ustawienia",
    "roles": ["admin"],
    "children": [
      {
        "label": "Zmiana hasła",
        "path": "/app/settings/password"
      },
      {
        "label": "Preferencje",
        "path": "/app/settings/preferences"
      }
    ]
  },
  {
    "label": "Profil",
    "path": "/app/profile",
    "roles": ["user", "admin"]
  }
]
```

## Licencja

MIT