--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2 (Ubuntu 14.2-1.pgdg20.04+1+b1)
-- Dumped by pg_dump version 14.0

-- Started on 2022-05-31 12:30:52

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'WIN1251';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 209 (class 1259 OID 140305)
-- Name: categories; Type: TABLE; Schema: public; Owner: iwkprkueyxyfwx
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    category text NOT NULL
);


ALTER TABLE public.categories OWNER TO iwkprkueyxyfwx;

--
-- TOC entry 210 (class 1259 OID 140310)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: iwkprkueyxyfwx
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO iwkprkueyxyfwx;

--
-- TOC entry 4376 (class 0 OID 0)
-- Dependencies: 210
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: iwkprkueyxyfwx
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- TOC entry 223 (class 1259 OID 169752)
-- Name: cookbooks; Type: TABLE; Schema: public; Owner: iwkprkueyxyfwx
--

CREATE TABLE public.cookbooks (
    "userId" integer NOT NULL,
    "recipeId" integer NOT NULL
);


ALTER TABLE public.cookbooks OWNER TO iwkprkueyxyfwx;

--
-- TOC entry 211 (class 1259 OID 140311)
-- Name: images; Type: TABLE; Schema: public; Owner: iwkprkueyxyfwx
--

CREATE TABLE public.images (
    id integer NOT NULL,
    uri text NOT NULL,
    description text,
    "recipeId" integer NOT NULL
);


ALTER TABLE public.images OWNER TO iwkprkueyxyfwx;

--
-- TOC entry 212 (class 1259 OID 140316)
-- Name: images_id_seq; Type: SEQUENCE; Schema: public; Owner: iwkprkueyxyfwx
--

CREATE SEQUENCE public.images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.images_id_seq OWNER TO iwkprkueyxyfwx;

--
-- TOC entry 4377 (class 0 OID 0)
-- Dependencies: 212
-- Name: images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: iwkprkueyxyfwx
--

ALTER SEQUENCE public.images_id_seq OWNED BY public.images.id;


--
-- TOC entry 213 (class 1259 OID 140317)
-- Name: ingredients; Type: TABLE; Schema: public; Owner: iwkprkueyxyfwx
--

CREATE TABLE public.ingredients (
    id integer NOT NULL,
    name text NOT NULL,
    measurement text
);


ALTER TABLE public.ingredients OWNER TO iwkprkueyxyfwx;

--
-- TOC entry 214 (class 1259 OID 140322)
-- Name: ingridients_id_seq; Type: SEQUENCE; Schema: public; Owner: iwkprkueyxyfwx
--

CREATE SEQUENCE public.ingridients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ingridients_id_seq OWNER TO iwkprkueyxyfwx;

--
-- TOC entry 4378 (class 0 OID 0)
-- Dependencies: 214
-- Name: ingridients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: iwkprkueyxyfwx
--

ALTER SEQUENCE public.ingridients_id_seq OWNED BY public.ingredients.id;


--
-- TOC entry 215 (class 1259 OID 140323)
-- Name: meals; Type: TABLE; Schema: public; Owner: iwkprkueyxyfwx
--

CREATE TABLE public.meals (
    id integer NOT NULL,
    meal text NOT NULL
);


ALTER TABLE public.meals OWNER TO iwkprkueyxyfwx;

--
-- TOC entry 216 (class 1259 OID 140328)
-- Name: meals_id_seq; Type: SEQUENCE; Schema: public; Owner: iwkprkueyxyfwx
--

CREATE SEQUENCE public.meals_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.meals_id_seq OWNER TO iwkprkueyxyfwx;

--
-- TOC entry 4379 (class 0 OID 0)
-- Dependencies: 216
-- Name: meals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: iwkprkueyxyfwx
--

ALTER SEQUENCE public.meals_id_seq OWNED BY public.meals.id;


--
-- TOC entry 217 (class 1259 OID 140329)
-- Name: recipe_ingredients; Type: TABLE; Schema: public; Owner: iwkprkueyxyfwx
--

CREATE TABLE public.recipe_ingredients (
    id integer NOT NULL,
    "recipeId" integer NOT NULL,
    "ingredientId" integer,
    quantity integer DEFAULT 1 NOT NULL
);


ALTER TABLE public.recipe_ingredients OWNER TO iwkprkueyxyfwx;

--
-- TOC entry 218 (class 1259 OID 140333)
-- Name: recipe_ingredients_id_seq; Type: SEQUENCE; Schema: public; Owner: iwkprkueyxyfwx
--

CREATE SEQUENCE public.recipe_ingredients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.recipe_ingredients_id_seq OWNER TO iwkprkueyxyfwx;

--
-- TOC entry 4380 (class 0 OID 0)
-- Dependencies: 218
-- Name: recipe_ingredients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: iwkprkueyxyfwx
--

ALTER SEQUENCE public.recipe_ingredients_id_seq OWNED BY public.recipe_ingredients.id;


--
-- TOC entry 219 (class 1259 OID 140334)
-- Name: recipes; Type: TABLE; Schema: public; Owner: iwkprkueyxyfwx
--

CREATE TABLE public.recipes (
    id integer NOT NULL,
    "categoryId" integer,
    "authorId" integer NOT NULL,
    "mealId" integer,
    "datePublished" date,
    "timeToCook" integer,
    instruction text NOT NULL,
    title text NOT NULL,
    "isApproved" boolean DEFAULT false
);


ALTER TABLE public.recipes OWNER TO iwkprkueyxyfwx;

--
-- TOC entry 220 (class 1259 OID 140339)
-- Name: recipes_id_seq; Type: SEQUENCE; Schema: public; Owner: iwkprkueyxyfwx
--

CREATE SEQUENCE public.recipes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.recipes_id_seq OWNER TO iwkprkueyxyfwx;

--
-- TOC entry 4381 (class 0 OID 0)
-- Dependencies: 220
-- Name: recipes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: iwkprkueyxyfwx
--

ALTER SEQUENCE public.recipes_id_seq OWNED BY public.recipes.id;


--
-- TOC entry 221 (class 1259 OID 140340)
-- Name: users; Type: TABLE; Schema: public; Owner: iwkprkueyxyfwx
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email text NOT NULL,
    login text NOT NULL,
    password text NOT NULL,
    "isGranted" boolean DEFAULT false NOT NULL,
    "isActivated" boolean DEFAULT false NOT NULL,
    "activationLink" text,
    "resetPasswordLink" text,
    "temporaryPassword" text
);


ALTER TABLE public.users OWNER TO iwkprkueyxyfwx;

--
-- TOC entry 222 (class 1259 OID 140347)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: iwkprkueyxyfwx
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO iwkprkueyxyfwx;

--
-- TOC entry 4382 (class 0 OID 0)
-- Dependencies: 222
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: iwkprkueyxyfwx
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4185 (class 2604 OID 140348)
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: iwkprkueyxyfwx
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- TOC entry 4186 (class 2604 OID 140349)
-- Name: images id; Type: DEFAULT; Schema: public; Owner: iwkprkueyxyfwx
--

ALTER TABLE ONLY public.images ALTER COLUMN id SET DEFAULT nextval('public.images_id_seq'::regclass);


--
-- TOC entry 4187 (class 2604 OID 140350)
-- Name: ingredients id; Type: DEFAULT; Schema: public; Owner: iwkprkueyxyfwx
--

ALTER TABLE ONLY public.ingredients ALTER COLUMN id SET DEFAULT nextval('public.ingridients_id_seq'::regclass);


--
-- TOC entry 4188 (class 2604 OID 140351)
-- Name: meals id; Type: DEFAULT; Schema: public; Owner: iwkprkueyxyfwx
--

ALTER TABLE ONLY public.meals ALTER COLUMN id SET DEFAULT nextval('public.meals_id_seq'::regclass);


--
-- TOC entry 4190 (class 2604 OID 140352)
-- Name: recipe_ingredients id; Type: DEFAULT; Schema: public; Owner: iwkprkueyxyfwx
--

ALTER TABLE ONLY public.recipe_ingredients ALTER COLUMN id SET DEFAULT nextval('public.recipe_ingredients_id_seq'::regclass);


--
-- TOC entry 4191 (class 2604 OID 140353)
-- Name: recipes id; Type: DEFAULT; Schema: public; Owner: iwkprkueyxyfwx
--

ALTER TABLE ONLY public.recipes ALTER COLUMN id SET DEFAULT nextval('public.recipes_id_seq'::regclass);


--
-- TOC entry 4195 (class 2604 OID 140354)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: iwkprkueyxyfwx
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4197 (class 2606 OID 140356)
-- Name: categories Category constraint; Type: CONSTRAINT; Schema: public; Owner: iwkprkueyxyfwx
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT "Category constraint" UNIQUE (category);


--
-- TOC entry 4383 (class 0 OID 0)
-- Dependencies: 4197
-- Name: CONSTRAINT "Category constraint" ON categories; Type: COMMENT; Schema: public; Owner: iwkprkueyxyfwx
--

COMMENT ON CONSTRAINT "Category constraint" ON public.categories IS 'Category must be unique';


--
-- TOC entry 4215 (class 2606 OID 140358)
-- Name: users Email constraint; Type: CONSTRAINT; Schema: public; Owner: iwkprkueyxyfwx
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "Email constraint" UNIQUE (email);


--
-- TOC entry 4384 (class 0 OID 0)
-- Dependencies: 4215
-- Name: CONSTRAINT "Email constraint" ON users; Type: COMMENT; Schema: public; Owner: iwkprkueyxyfwx
--

COMMENT ON CONSTRAINT "Email constraint" ON public.users IS 'Email must be unique';


--
-- TOC entry 4217 (class 2606 OID 140360)
-- Name: users Login constraint; Type: CONSTRAINT; Schema: public; Owner: iwkprkueyxyfwx
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "Login constraint" UNIQUE (login);


--
-- TOC entry 4385 (class 0 OID 0)
-- Dependencies: 4217
-- Name: CONSTRAINT "Login constraint" ON users; Type: COMMENT; Schema: public; Owner: iwkprkueyxyfwx
--

COMMENT ON CONSTRAINT "Login constraint" ON public.users IS 'Login must be unique.';


--
-- TOC entry 4207 (class 2606 OID 140362)
-- Name: meals Meal constraint; Type: CONSTRAINT; Schema: public; Owner: iwkprkueyxyfwx
--

ALTER TABLE ONLY public.meals
    ADD CONSTRAINT "Meal constraint" UNIQUE (meal);


--
-- TOC entry 4386 (class 0 OID 0)
-- Dependencies: 4207
-- Name: CONSTRAINT "Meal constraint" ON meals; Type: COMMENT; Schema: public; Owner: iwkprkueyxyfwx
--

COMMENT ON CONSTRAINT "Meal constraint" ON public.meals IS 'Meal must be unique';


--
-- TOC entry 4203 (class 2606 OID 140364)
-- Name: ingredients Name constraint; Type: CONSTRAINT; Schema: public; Owner: iwkprkueyxyfwx
--

ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT "Name constraint" UNIQUE (name);


--
-- TOC entry 4387 (class 0 OID 0)
-- Dependencies: 4203
-- Name: CONSTRAINT "Name constraint" ON ingredients; Type: COMMENT; Schema: public; Owner: iwkprkueyxyfwx
--

COMMENT ON CONSTRAINT "Name constraint" ON public.ingredients IS 'Name must be unique';


--
-- TOC entry 4199 (class 2606 OID 140366)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: iwkprkueyxyfwx
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 4221 (class 2606 OID 489720)
-- Name: cookbooks cookbooks_pkey; Type: CONSTRAINT; Schema: public; Owner: iwkprkueyxyfwx
--

ALTER TABLE ONLY public.cookbooks
    ADD CONSTRAINT cookbooks_pkey PRIMARY KEY ("userId", "recipeId");


--
-- TOC entry 4201 (class 2606 OID 140368)
-- Name: images images_pkey; Type: CONSTRAINT; Schema: public; Owner: iwkprkueyxyfwx
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (id);


--
-- TOC entry 4205 (class 2606 OID 140370)
-- Name: ingredients ingridients_pkey; Type: CONSTRAINT; Schema: public; Owner: iwkprkueyxyfwx
--

ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingridients_pkey PRIMARY KEY (id);


--
-- TOC entry 4209 (class 2606 OID 140372)
-- Name: meals meals_pkey; Type: CONSTRAINT; Schema: public; Owner: iwkprkueyxyfwx
--

ALTER TABLE ONLY public.meals
    ADD CONSTRAINT meals_pkey PRIMARY KEY (id);


--
-- TOC entry 4211 (class 2606 OID 140374)
-- Name: recipe_ingredients recipe_ingredients_pkey; Type: CONSTRAINT; Schema: public; Owner: iwkprkueyxyfwx
--

ALTER TABLE ONLY public.recipe_ingredients
    ADD CONSTRAINT recipe_ingredients_pkey PRIMARY KEY (id);


--
-- TOC entry 4213 (class 2606 OID 140376)
-- Name: recipes recipes_pkey; Type: CONSTRAINT; Schema: public; Owner: iwkprkueyxyfwx
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY (id);


--
-- TOC entry 4219 (class 2606 OID 140378)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: iwkprkueyxyfwx
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4227 (class 2606 OID 527045)
-- Name: recipes author_recipe_FK; Type: FK CONSTRAINT; Schema: public; Owner: iwkprkueyxyfwx
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT "author_recipe_FK" FOREIGN KEY ("authorId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 4226 (class 2606 OID 527040)
-- Name: recipes category_recipe_FK; Type: FK CONSTRAINT; Schema: public; Owner: iwkprkueyxyfwx
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT "category_recipe_FK" FOREIGN KEY ("categoryId") REFERENCES public.categories(id) ON UPDATE SET NULL ON DELETE SET NULL NOT VALID;


--
-- TOC entry 4228 (class 2606 OID 527009)
-- Name: cookbooks cb_recipe_FK; Type: FK CONSTRAINT; Schema: public; Owner: iwkprkueyxyfwx
--

ALTER TABLE ONLY public.cookbooks
    ADD CONSTRAINT "cb_recipe_FK" FOREIGN KEY ("recipeId") REFERENCES public.recipes(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 4229 (class 2606 OID 527014)
-- Name: cookbooks cb_user_FK; Type: FK CONSTRAINT; Schema: public; Owner: iwkprkueyxyfwx
--

ALTER TABLE ONLY public.cookbooks
    ADD CONSTRAINT "cb_user_FK" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 4224 (class 2606 OID 527030)
-- Name: recipe_ingredients i_recipe_ingredients_FK; Type: FK CONSTRAINT; Schema: public; Owner: iwkprkueyxyfwx
--

ALTER TABLE ONLY public.recipe_ingredients
    ADD CONSTRAINT "i_recipe_ingredients_FK" FOREIGN KEY ("ingredientId") REFERENCES public.ingredients(id) ON UPDATE SET NULL ON DELETE SET NULL NOT VALID;


--
-- TOC entry 4222 (class 2606 OID 527019)
-- Name: images image_recipes; Type: FK CONSTRAINT; Schema: public; Owner: iwkprkueyxyfwx
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT image_recipes FOREIGN KEY ("recipeId") REFERENCES public.recipes(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 4225 (class 2606 OID 527035)
-- Name: recipes meal_recipe_FK; Type: FK CONSTRAINT; Schema: public; Owner: iwkprkueyxyfwx
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT "meal_recipe_FK" FOREIGN KEY ("mealId") REFERENCES public.meals(id) ON UPDATE SET NULL ON DELETE SET NULL NOT VALID;


--
-- TOC entry 4223 (class 2606 OID 527024)
-- Name: recipe_ingredients r_recipe_ingredients_FK; Type: FK CONSTRAINT; Schema: public; Owner: iwkprkueyxyfwx
--

ALTER TABLE ONLY public.recipe_ingredients
    ADD CONSTRAINT "r_recipe_ingredients_FK" FOREIGN KEY ("recipeId") REFERENCES public.recipes(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 4374 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: iwkprkueyxyfwx
--

REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO iwkprkueyxyfwx;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- TOC entry 4375 (class 0 OID 0)
-- Dependencies: 860
-- Name: LANGUAGE plpgsql; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON LANGUAGE plpgsql TO iwkprkueyxyfwx;


-- Completed on 2022-05-31 12:31:00

--
-- PostgreSQL database dump complete
--

