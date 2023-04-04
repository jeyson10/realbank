--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: certificado_bancario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.certificado_bancario (
    id integer NOT NULL,
    monto double precision NOT NULL,
    meses integer NOT NULL,
    interes double precision NOT NULL,
    penalizacion double precision NOT NULL,
    "fechaVencimiento" date NOT NULL,
    estado boolean DEFAULT true NOT NULL,
    "clienteId" integer NOT NULL,
    "fechaInicio" date NOT NULL
);


ALTER TABLE public.certificado_bancario OWNER TO postgres;

--
-- Name: certificado_bancario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.certificado_bancario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.certificado_bancario_id_seq OWNER TO postgres;

--
-- Name: certificado_bancario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.certificado_bancario_id_seq OWNED BY public.certificado_bancario.id;


--
-- Name: cliente; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cliente (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    apellido character varying NOT NULL,
    correo character varying NOT NULL,
    identificacion character varying NOT NULL,
    telefono character varying NOT NULL,
    estado boolean DEFAULT true NOT NULL
);


ALTER TABLE public.cliente OWNER TO postgres;

--
-- Name: cliente_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cliente_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cliente_id_seq OWNER TO postgres;

--
-- Name: cliente_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cliente_id_seq OWNED BY public.cliente.id;


--
-- Name: deposito; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.deposito (
    id integer NOT NULL,
    monto double precision NOT NULL,
    fecha date NOT NULL,
    "certificadoId" integer NOT NULL
);


ALTER TABLE public.deposito OWNER TO postgres;

--
-- Name: deposito_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.deposito_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.deposito_id_seq OWNER TO postgres;

--
-- Name: deposito_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.deposito_id_seq OWNED BY public.deposito.id;


--
-- Name: certificado_bancario id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certificado_bancario ALTER COLUMN id SET DEFAULT nextval('public.certificado_bancario_id_seq'::regclass);


--
-- Name: cliente id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cliente ALTER COLUMN id SET DEFAULT nextval('public.cliente_id_seq'::regclass);


--
-- Name: deposito id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deposito ALTER COLUMN id SET DEFAULT nextval('public.deposito_id_seq'::regclass);


--
-- Data for Name: certificado_bancario; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.certificado_bancario VALUES (17, 50000, 12, 7.2, 10, '2024-04-03', true, 10, '2022-08-03');
INSERT INTO public.certificado_bancario VALUES (16, 20000, 12, 6.5, 50, '2024-04-03', true, 9, '2023-03-03');
INSERT INTO public.certificado_bancario VALUES (15, 10000, 12, 5, 5, '2024-04-03', true, 8, '2023-04-03');


--
-- Data for Name: cliente; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.cliente VALUES (8, 'Jeyson', 'Diez', 'jdiez@gmail.com', '5541121', '4524524', true);
INSERT INTO public.cliente VALUES (9, 'Pedro', 'Baez', 'pedro@gmail.com', '554112551', '452452554', true);
INSERT INTO public.cliente VALUES (10, 'Ana', 'Perez', 'perez@gmail.com', '5541126551', '4524526554', true);


--
-- Data for Name: deposito; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Name: certificado_bancario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.certificado_bancario_id_seq', 17, true);


--
-- Name: cliente_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cliente_id_seq', 10, true);


--
-- Name: deposito_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.deposito_id_seq', 6, true);


--
-- Name: cliente PK_18990e8df6cf7fe71b9dc0f5f39; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "PK_18990e8df6cf7fe71b9dc0f5f39" PRIMARY KEY (id);


--
-- Name: certificado_bancario PK_469a4537492b266f0b5a73bf90d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certificado_bancario
    ADD CONSTRAINT "PK_469a4537492b266f0b5a73bf90d" PRIMARY KEY (id);


--
-- Name: deposito PK_6b3dfe64ef12ee03ff8cab435f3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deposito
    ADD CONSTRAINT "PK_6b3dfe64ef12ee03ff8cab435f3" PRIMARY KEY (id);


--
-- Name: certificado_bancario FK_4f6bac4a37235fc073e98ad469a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certificado_bancario
    ADD CONSTRAINT "FK_4f6bac4a37235fc073e98ad469a" FOREIGN KEY ("clienteId") REFERENCES public.cliente(id);


--
-- Name: deposito FK_60a21637ca7497825ff9f3e7659; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deposito
    ADD CONSTRAINT "FK_60a21637ca7497825ff9f3e7659" FOREIGN KEY ("certificadoId") REFERENCES public.certificado_bancario(id);


--
-- PostgreSQL database dump complete
--

