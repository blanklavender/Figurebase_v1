
**Github**: https://github.com/PaulleDemon/awesome-landing-pages

## Usage

* This template uses tailwind css every tailwind class are prefixed with `tw-`, to help differentiate
  between tailwind classes and other classes  

During development add the following to head tag

```html
<link rel="stylesheet" href="tailwind-runtime.css"><!--replace with path to your tailwind runtime-->
```
During production use

```html
<link rel="stylesheet" href="tailwind-build.css"><!--replace with path to your tailwind build-->
```

To start Tailwind during development use
```html
npm run start:tailwind
```

To create a build file use
```html
npm run build:tailwind
```
Icons from: https://www.flaticon.com/

# Deploying Supabase Project on Vercel

### Steps to Deploy:
1. **Set Up Environment Variables**
 ```sh
 vercel env add SUPABASE_URL your_supabase_url
 vercel env add SUPABASE_ANON_KEY your_supabase_anon_key
 vercel env add SUPABASE_SERVICE_ROLE_KEY your_supabase_service_role_key
 ```

2. **Link Project to Vercel**
  ```sh
  vercel link
```

3. **Pull Environment Variables Locally`**
  ```sh
  vercel pull
```

4. **Deploy the Project or Run it Locally**
  ```sh
  vercel dev
  vercel --prod
```

5. **Configure Supabase CORS**
* Add your Vercel deployment URL in the Supabase Authentication → URL Configuration.