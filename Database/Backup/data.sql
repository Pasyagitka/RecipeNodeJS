--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2 (Ubuntu 14.2-1.pgdg20.04+1+b1)
-- Dumped by pg_dump version 14.0

-- Started on 2022-05-31 12:31:47

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

--
-- TOC entry 4358 (class 0 OID 140305)
-- Dependencies: 209
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: iwkprkueyxyfwx
--

COPY public.categories (id, category) FROM stdin;
1	salat
3	porridge
4	cutlet
15	pasta
16	soup
17	cookies
18	cakes
2	sauce
\.


--
-- TOC entry 4364 (class 0 OID 140323)
-- Dependencies: 215
-- Data for Name: meals; Type: TABLE DATA; Schema: public; Owner: iwkprkueyxyfwx
--

COPY public.meals (id, meal) FROM stdin;
2	lunch
8	dinner
1	breakfast
13	lunch0
\.


--
-- TOC entry 4370 (class 0 OID 140340)
-- Dependencies: 221
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: iwkprkueyxyfwx
--

COPY public.users (id, email, login, password, "isGranted", "isActivated", "activationLink", "resetPasswordLink", "temporaryPassword") FROM stdin;
48	pasyagitka__@yandex.by	pasyagitka11	$2b$04$sPXVleEfkQl74kbesZKOlOz9Oew20fVCvojRn1ST.hkAeG4ukZ1m.	f	t	\N	\N	\N
50	pasyagitka@yandex.by	lizaaa	$2b$04$h/SuMl3/nZCubswMSLr5QO9J9GUjb/Oh7h4PdbE7AC7ktBhbw/v32	f	t	60ac3441-6499-4b3a-b4aa-5e19f003d1fa	\N	\N
51	pasyagitka@yandex.byi	wer	$2b$04$ACu7JSuncgQa.6UJONcC1.a6V11UZLsbOsdqBAxQCcaNZd5KnWY3C	f	f	e246ba17-a4ea-4670-a98c-d878e4159fc9	\N	\N
55	lziaveuy@gmail.com	Qqqqqq	$2b$04$cFDRKlWVgHwejOCagU.N8u1Vu01NiJaPEoeqNsntQYVProS0s0GLO	f	f	ecae8b83-5063-49bb-99b1-29e60a6d9024	\N	\N
56	qwerty@gmail.com	wwwww	$2b$04$DLwMbQkIccqoICsobIRq.OTCkYFABttlssKZ2Shwd3.9NhFr.8qdu	f	f	99891828-3ac7-4919-b578-fb78b6bf48e0	\N	\N
52	lizavetazinovic1h@gmail.com	pasyagitka111111	$2b$04$6dME658lv.QKlQryb1aCle05..FhAdkeYwVwcnUyqKaKGQc9rXFk6	f	f	91a16917-db1d-4605-8e2b-f96c80d47169	\N	\N
53	pasyagitkaqqq@yandex.by	qwqw	$2b$04$IVPmNMxPZTS8TRqlOkBExeenke91T3BisIMlBAuWpMEEDTSX0fRL.	f	f	32e492c6-dbe3-4173-82ee-1e1329848db0	\N	\N
57	lizavetazinovich@gmail.by	pasyagitka1	$2b$04$e5Gv2snvqVvePIwyzw.E4eBGuX7c6aVTU8J5.a4eOb5Jk7QaWPHX.	f	f	e1848049-6807-4bd9-97e9-57350ebd2039	\N	\N
58	lizavetazinovicr@gmail.com	fffwr	$2b$04$CfPJxxavH3buBWUL8kGnT.pf8XmyU33YKPeoExIf.7NR0I5373thi	f	f	8e6f82c2-d064-4c99-aea2-5090b741b8ef	\N	\N
54	ewhfiowefiow@eriier.com	woeifjiwefio	$2b$04$F9m4H85lIRt.oS3KYzazYeM2zz7Ff.MH5KDsD/6MRCHFh/zGMCgqu	f	f	1709a2f5-20dd-4cde-96ac-674f12a4f847	\N	\N
59	sergeev.s1012@gmail.com	Siarhei	$2b$04$nVNl6.bw6tP9yvZnfNlaJuqijvUKWmEYnh4e3RJKBtYa9W/9TJxfK	f	t	\N	\N	\N
49	pasyagitka1@yandex.by	pasyagitka111	$2b$04$vxQC81fulgh7NRep9tvFpOGdB5n4V3lB5jSZcBMGqaAEsM2Rxy3TO	f	f	bd2a5ee1-8448-4d6b-afbe-81367c0e42d8	\N	\N
60	qwer@gmail.com	qwert	$2b$04$GtXRGY/UbC2MPbe.JJokL.jWIDLME3sd3ze3XliAjdFO/1d6Pg/4y	f	f	7655ddaa-50d1-42a7-9fdd-b6b206089e82	\N	\N
61	qwer99@gmail.com	qwert00	$2b$04$udLX.Ez9sNj5S8rh9XraCOpn3oxe7WFdiy6Gk3lAch4XHkqE81Sxy	f	f	549a5b21-5967-41d0-b394-04d442521459	\N	\N
62	lizavetazinovich1234@gmail.com	lizaliza	$2b$04$EYSM1qHUWwdefnMd2GIXHOo9jCuzOABUMmHdcmbCIQnDwiuAa9MYe	f	f	42cd5542-bab0-4bf8-875b-6abc6b4dd9f1	\N	\N
27	lizavetazinovich@gmail.com	pasyagitka	$2b$04$Y/wn9hzslkFe1enxoqFoweWjMBuOSNS6aqC.zvBkrG7JIQwaE/1He	t	t	\N	dab9b891-9d6c-46a8-9b37-63817816b3d5	$2b$04$DBcOX07AYjkSqM8a.4PEZ.rFDnuPgP5bZChSboWaRCG9So0PUUOSa
\.


--
-- TOC entry 4368 (class 0 OID 140334)
-- Dependencies: 219
-- Data for Name: recipes; Type: TABLE DATA; Schema: public; Owner: iwkprkueyxyfwx
--

COPY public.recipes (id, "categoryId", "authorId", "mealId", "datePublished", "timeToCook", instruction, title, "isApproved") FROM stdin;
28	1	50	1	2022-05-12	12333	 Chocolate pound cake is a rich, moist, and dense but tender loaf cakeЧa chocolatey perfection! ItТs made with pantry staples, and itТs super speedy and easy to whip up (no electric mixer required here). I hope it will become a staple in your household as a perfect any day treat. \n\nI love a slice of this pound cake with my beloved morning coffee. It also satisfies my after-dinner sweets craving. Recently, I poked a few (yes, just a few!) candles on top to celebrate my chocolate-loving motherТs birthday. I will be baking it over and over again.\n\nBefore you rush off to preheat your oven, I want to share a few things I learned that will help you bake the best chocolate pound cake ever.  	Salat	t
31	4	50	1	2022-05-12	11	\n\nWith 6 cups of flour, how you measure the flour makes a difference. Lightly fluff up the flour in the container, use a cup measure to scoop up flour, then use a blunt knife to level the flour. Do not pack or tamp down the flour in the cup.\n\nThis recipe is best for making a gingerbread house, not cookies. For cookies, I prefer my gingerbread cookie recipe.\n\nIf you have pets in your house, keep them away from the gingerbread house during all phases of construction and decorating. Non-gingerbread-house-building-participating adults and children should be informed to keep their hands off the house as well!\n\nThese instructions were adapted from those found in the 1996 Joy of Cooking.	Salad "Anastasia"	t
34	1	50	1	2022-05-13	3	\n\nWith 6 cups of flour, how you measure the flour makes a difference. Lightly fluff up the flour in the container, use a cup measure to scoop up flour, then use a blunt knife to level the flour. Do not pack or tamp down the flour in the cup.\n\nThis recipe is best for making a gingerbread house, not cookies. For cookies, I prefer my gingerbread cookie recipe.\n\nIf you have pets in your house, keep them away from the gingerbread house during all phases of construction and decorating. Non-gingerbread-house-building-participating adults and children should be informed to keep their hands off the house as well!\n\nThese instructions were adapted from those found in the 1996 Joy of Cooking.	Salad "Oleg"	t
58	18	27	1	2022-05-17	11	eeee	Cake sloeniy	t
29	1	27	1	2022-05-12	1	Method\n\n    Heat your oven broiler to its highest setting:\n\n    Place a rack a few inches below the broiler.\n    Make the bruschetta topping:\n\n    In a medium mixing bowl, stir together all of the bruschetta topping ingredients. Set aside.\n    Mix together the tomato topping for Cheesy Bruschetta Chicken Cutlets\n    Sear the chicken:\n\n    Season the chicken cutlets on both sides with the salt and pepper.\n\n    Heat the olive oil in a large (12-inch), oven-safe skillet over medium high heat. I like to use either a cast iron or stainless steel skillet -- nonstick and enameled cast iron cookware usually aren't meant to be used above 500oF, so they arenТt broiler safe.\n\n    When the oil is shimmering, sear the chicken cutlets for 3 minutes on one side, just so they get a little bit of color.\n\n    ItТs ok if they are not cooked through, since they will finish cooking in the oven.\n    Sear the chicken cutlets in a pan.\n    Flip and season the cutlets:\n\n    Flip the cutlets over, then spoon on the bruschetta topping and sprinkle with the mozzarella and Parmesan cheese. Let them cook in the pan for 1 1/2 to 2 minutes.\n    Finish searing the chicken on the stovetop\n    Top the chicken with tomato bruschetta topping\n    Top the chicken with tomato bruschetta topping and cheese\n    Broil the chicken:\n\n    Place the skillet under the broiler. Broil until the cheese is bubbly and brown and the chicken is cooked through, about 3 minutes.\n\n    Check for doneness by cutting into one of the cutlets to see if itТs opaque in the center, or by checking the temperature of one of the cutlets with an instant-read thermometer (the chicken should be 165oF or higher in the center).\n\n    At this point, your chicken should be ready, but if you used cutlets that were thicker than 1/4-inch you may have to return it to the stovetop to cook for another 1-3 minutes. Check the temperature of the cheesy bruschetta cutlets	Figs and almonds	t
36	1	50	1	2022-05-13	5	\n\nWith 6 cups of flour, how you measure the flour makes a difference. Lightly fluff up the flour in the container, use a cup measure to scoop up flour, then use a blunt knife to level the flour. Do not pack or tamp down the flour in the cup.\n\nThis recipe is best for making a gingerbread house, not cookies. For cookies, I prefer my gingerbread cookie recipe.\n\nIf you have pets in your house, keep them away from the gingerbread house during all phases of construction and decorating. Non-gingerbread-house-building-participating adults and children should be informed to keep their hands off the house as well!\n\nThese instructions were adapted from those found in the 1996 Joy of Cooking.	Toasted almonds	t
183	4	50	2	2022-05-23	60	Kulebyaka with meat is a closed oblong-shaped Russian pie cooked on a soft and fluffy yeast dough. Previously, kulebyaka was necessarily baked with a complex filling, consisting of several tiers. And so that the products do not mix, thin pancakes were used as layers.\n\nNow, according to the old technology, kulebyaka is rarely prepared. In order to save time, housewives usually take only 1-2 ingredients for the filling. It can be meat, fish, vegetables, etc. There are no rigid frames and strict borders here - you can cook a cake with any filler! In our example, consider a simple recipe for kulebyaki with minced meat.	Chic kulebyaka	t
194	3	50	1	2022-05-24	111	dfghjk	new recipee	t
32	1	50	1	2022-05-12	1	 Chocolate pound cake is a rich, moist, and dense but tender loaf cakeЧa chocolatey perfection! ItТs made with pantry staples, and itТs super speedy and easy to whip up (no electric mixer required here). I hope it will become a staple in your household as a perfect any day treat. \n\nI love a slice of this pound cake with my beloved morning coffee. It also satisfies my after-dinner sweets craving. Recently, I poked a few (yes, just a few!) candles on top to celebrate my chocolate-loving motherТs birthday. I will be baking it over and over again.\n\nBefore you rush off to preheat your oven, I want to share a few things I learned that will help you bake the best chocolate pound cake ever.  	Salad "New Year's"	t
59	18	27	2	2022-05-17	60	Sift 5 cups (cup capacity 250 ml) of flour onto a board. Add margarine at room temperature and chop with a knife into more or less homogeneous crumbs. I prefer to first cut the margarine into pieces, and then rub it with my hands, it turns out faster and the crumb is more uniform.\nGradually pouring in 1 glass of milk, quickly knead the dough. It turns out greasy, does not stick to the hands and the board. I must say that in no case should you knead the dough for "Napoleon" for a long time, otherwise the dough will "tighten" when rolling out.\nDivide the dough in half and cut each part into 7 pieces (14 pieces in total). Roll out very thin. The dough is very grateful, it rolls out easily and does not tear. There is no need to wind it up with a rolling pin. Transfer the dough to a clean, dry baking sheet, flatten.\nCut, prick with a fork. I took the bottom from a detachable form with a diameter of 28 cm. Bake at 200 * C until golden brown. It bakes very quickly, literally 5-7 minutes. You have to be careful not to overdo it. Remove very carefully with a wide knife, the cakes are very fragile ...\nHere we have such a stack of cakes ...\n\n\nScatter the scraps on a baking sheet and bake until light brown. When the scraps have cooled, grind them into large crumbs. I just rub my hands.\n\nNow let's start making the cream. 3 yolks grind with 3 tbsp. l. white sugar, add 3 tbsp. l. flour. Mix. Dilute with a small amount of milk, taken from the norm for 2 creams, to a jelly mass.\n\nBoil the remaining milk (only 0.5 l) and pour into the mass, stirring. Boil. Cool down. Whip the butter with 2 cups of sugar. Add the custard one tablespoon at a time and beat on medium speed until smooth each time. It is necessary to act carefully, because if you throw a lot of custard at once, the general cream can exfoliate.\n\nThe cream is very fluffy, soft and airy. Coat the cakes with a THIN layer of cream and put them in a pile. Chop up the scraps and sprinkle on top. Leave some crumbs.\n\nThis is what our cake will look like after spreading the cakes. He's a bit of an ass.\n\nCover with a board and carefully place a small oppression on top. I have a 2 liter kettle with water. So leave it overnight. Remove the load in the morning. The cake will settle. Fluff the top slightly with a fork. The cream will squeeze out a little on the sides, smear it and sprinkle the sides with crumbs.\nThat's it! This is my Napoleon. We love this cake, especially my husband. All the time he asks me to cook it, but for the family I cook it very rarely. I cooked for myself for my 40th birthday, and then for my husbandТs 55th birthday (and we have been with him since the same year) ...\nThis is what it looks like cutaway. Do you believe there are 14 cakes here?\nHooray!!! Hooray!!! I learned how to enlarge photos! Girls, thanks for the help! Hooray!!!	Napoleon cake	t
189	4	27	2	2022-05-24	45	ѕриготовление котлет нередко оборачиваетс€ неудачей, и они получаютс€ не такими вкусными, ароматными и сочными. ¬ кулинарии существует много разных хитростей, благодар€ которым все могут узнать, как приготовить сочные котлеты. —егодн€ мы поделимс€ некоторыми из них. 	Cutlet "Maxim"	t
57	18	27	1	2022-05-17	98	cakeee	Napoleon2	t
30	16	27	1	2022-05-12	1132	 Chocolate pound cake is a rich, moist, and dense but tender loaf cakeЧa chocolatey perfection! ItТs made with pantry staples, and itТs super speedy and easy to whip up (no electric mixer required here). I hope it will become a staple in your household as a perfect any day treat. \n\nI love a slice of this pound cake with my beloved morning coffee. It also satisfies my after-dinner sweets craving. Recently, I poked a few (yes, just a few!) candles on top to celebrate my chocolate-loving motherТs birthday. I will be baking it over and over again.\n\nBefore you rush off to preheat your oven, I want to share a few things I learned that will help you bake the best chocolate pound cake ever.  	Pie "Red Velvet"	t
33	1	50	1	2022-05-13	3	 Chocolate pound cake is a rich, moist, and dense but tender loaf cakeЧa chocolatey perfection! ItТs made with pantry staples, and itТs super speedy and easy to whip up (no electric mixer required here). I hope it will become a staple in your household as a perfect any day treat. \n\nI love a slice of this pound cake with my beloved morning coffee. It also satisfies my after-dinner sweets craving. Recently, I poked a few (yes, just a few!) candles on top to celebrate my chocolate-loving motherТs birthday. I will be baking it over and over again.\n\nBefore you rush off to preheat your oven, I want to share a few things I learned that will help you bake the best chocolate pound cake ever.  	Cutlets "Swallow's Nest"	t
84	4	50	8	2022-05-20	55	рецпет	рецепт	t
35	1	50	1	2022-05-13	7	 Chocolate pound cake is a rich, moist, and dense but tender loaf cakeЧa chocolatey perfection! ItТs made with pantry staples, and itТs super speedy and easy to whip up (no electric mixer required here). I hope it will become a staple in your household as a perfect any day treat. \n\nI love a slice of this pound cake with my beloved morning coffee. It also satisfies my after-dinner sweets craving. Recently, I poked a few (yes, just a few!) candles on top to celebrate my chocolate-loving motherТs birthday. I will be baking it over and over again.\n\nBefore you rush off to preheat your oven, I want to share a few things I learned that will help you bake the best chocolate pound cake ever.  	Salad "Alexey"	t
23	4	50	2	2022-05-10	35	Method\n\n    Heat your oven broiler to its highest setting:\n\n    Place a rack a few inches below the broiler.\n    Make the bruschetta topping:\n\n    In a medium mixing bowl, stir together all of the bruschetta topping ingredients. Set aside.\n    Mix together the tomato topping for Cheesy Bruschetta Chicken Cutlets\n    Sear the chicken:\n\n    Season the chicken cutlets on both sides with the salt and pepper.\n\n    Heat the olive oil in a large (12-inch), oven-safe skillet over medium high heat. I like to use either a cast iron or stainless steel skillet -- nonstick and enameled cast iron cookware usually aren't meant to be used above 500oF, so they arenТt broiler safe.\n\n    When the oil is shimmering, sear the chicken cutlets for 3 minutes on one side, just so they get a little bit of color.\n\n    ItТs ok if they are not cooked through, since they will finish cooking in the oven.\n    Sear the chicken cutlets in a pan.\n    Flip and season the cutlets:\n\n    Flip the cutlets over, then spoon on the bruschetta topping and sprinkle with the mozzarella and Parmesan cheese. Let them cook in the pan for 1 1/2 to 2 minutes.\n    Finish searing the chicken on the stovetop\n    Top the chicken with tomato bruschetta topping\n    Top the chicken with tomato bruschetta topping and cheese\n    Broil the chicken:\n\n    Place the skillet under the broiler. Broil until the cheese is bubbly and brown and the chicken is cooked through, about 3 minutes.\n\n    Check for doneness by cutting into one of the cutlets to see if itТs opaque in the center, or by checking the temperature of one of the cutlets with an instant-read thermometer (the chicken should be 165oF or higher in the center).\n\n    At this point, your chicken should be ready, but if you used cutlets that were thicker than 1/4-inch you may have to return it to the stovetop to cook for another 1-3 minutes. Check the temperature of the cheesy bruschetta cutlets	Salat "Man`s tears"	t
\.


--
-- TOC entry 4372 (class 0 OID 169752)
-- Dependencies: 223
-- Data for Name: cookbooks; Type: TABLE DATA; Schema: public; Owner: iwkprkueyxyfwx
--

COPY public.cookbooks ("userId", "recipeId") FROM stdin;
27	29
27	183
\.


--
-- TOC entry 4360 (class 0 OID 140311)
-- Dependencies: 211
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: iwkprkueyxyfwx
--

COPY public.images (id, uri, description, "recipeId") FROM stdin;
2	https://avatars.mds.yandex.net/get-zen_doc/1654267/pub_61026c7c90aa1a2270ab41c1_61026c9558d3f036d32f3c9e/scale_1200	\N	23
3	https://avatars.mds.yandex.net/get-zen_doc/1654267/pub_61026c7c90aa1a2270ab41c1_61026c9558d3f036d32f3c9e/scale_1200	\N	29
4	https://avatars.mds.yandex.net/i?id=a63a8b8d324ab381e76613589ad84fb0-5899891-images-thumbs&n=13&exp=1	\N	28
5	https://yandex-images.clstorage.net/u9VT5d406/afa4d7-YMbL0/5e7rGY1GywwUkoCiYBoV-z3Cxiegus7OoRaH4mgn80Ime8iS7qDgDqF2AWCWp-CgnsEIWmxD1QTi4hCeSdQ2AZGqKqhptmscFKJQM9CKZUu9MkZm4MrrS9CjpyZoAreWNvvu5Bnnx70TwDOStCVhYOsEXVvYhrHSNJLGqy2S4rd0vMr6mATZPVMwktEAGTT9jXAWQiMOn8_0chSFjYGGJZJOXXd7tEVc05AxgnRlskLapyxInQbQkeYFl6lcAqK3pi1paSvU-W4z0oJhsgt0vPwT18BQnR7MlCPlBG8wdDRSL45HS2eHP0NgURFENUIQuIaN-C7kcmMlFJU7jiMDJqRNePo7NHjtooPA8DFaJDzvc7VSwg3vbvZxdOfckWWVQR2cJus3hIzzw4AgZzYDkjhmfXgt98FQ1QX3K77Qo8QGfopISZSYzjFiMiMS21aO3dHUY7Dsnr3GMBS0_0CGh7G-3ybrVzduE4EwcrWHcVB5RYxKbiejMlfGd4jsszIWxQ2qaRjm-n0zYoAycUk2_0-R1ZMCz19dtODXZawyNsdB7D51yRfGH8JRoGJlxTKjeTeOq24GUtCmZgSq7HHRZAQMusur9LsssiBiUkCJZJ8vwTQAc20dXtfBZcX9MPVnUx5-VyqHByyDokAAFYfgg9t0XXstRwATVaTVWa-jg-TXjlt6qveKfdITgtJiy9V9vhKEYXG-fh2WMYTHHeO1NiMeP2WZxlQ8QJNAgfZm8dLZZp3pTKSxcLe0Z0pdsWFEBI37e5t1SA5zczBw0UsU_R8TtXBAzJ9uZGAXVFzylGQxrG52i4W0zMJj85BEl6Jgm9adqmy0EsHkZicJPrNDtraNWxoattg9swJxMxNYBV8cgnfgEMxMjLSTRWUd8iaFUF_NJxtVVD-REHKRRKeSwdmnXkicpECzV1b02X2wIwYm7qs7KwR539EgAmGh-yQO3FHkYiFOrV2UI5cHU	\N	30
6	https://avatars.mds.yandex.net/i?id=517dcf4f9c406cef20b1126202d8298d-5911250-images-thumbs&n=13&exp=1	\N	31
7	https://avatars.mds.yandex.net/i?id=b4844241913031b647aa87653e4b8385-4079986-images-thumbs&ref=rim&n=33&w=283&h=188	\N	32
8	https://avatars.mds.yandex.net/i?id=b2e06301e0cb2672a5806212da80b92e-5647646-images-thumbs&n=13&exp=1	\N	33
9	https://avatars.mds.yandex.net/i?id=d3eff2b2585547f1f3a733286e43b12f-4055370-images-thumbs&n=13&exp=1	\N	35
10	https://avatars.mds.yandex.net/i?id=09b1d6617ee14f6b66717e2ea66abc2a-4432629-images-thumbs&n=13&exp=1	\N	34
12	https://avatars.mds.yandex.net/i?id=09b1d6617ee14f6b66717e2ea66abc2a-4432629-images-thumbs&n=13&exp=1	\N	36
15	https://res.cloudinary.com/dblablirp/image/upload/v1652803134/boblhvjbafgpfs2xysip.webp	\N	59
14	https://res.cloudinary.com/dblablirp/image/upload/v1652820922/gcin6omvl84wvyodorsd.webp	\N	58
13	https://res.cloudinary.com/dblablirp/image/upload/v1652820962/ooywtirkeewoopzqq9h4.webp	\N	57
133	https://res.cloudinary.com/dblablirp/image/upload/v1653312028/jmffo8hvrwykqyb7qwoe.jpg	\N	183
34	https://res.cloudinary.com/dblablirp/image/upload/v1653073888/koonmjonacxlmn4byuws.webp	\N	84
144	https://res.cloudinary.com/dblablirp/image/upload/v1653392717/syvqka9ljeh2zmqiz92h.webp	\N	194
139	https://res.cloudinary.com/dblablirp/image/upload/v1653392852/sydjgms5dlnpovzjfiau.png	\N	189
\.


--
-- TOC entry 4362 (class 0 OID 140317)
-- Dependencies: 213
-- Data for Name: ingredients; Type: TABLE DATA; Schema: public; Owner: iwkprkueyxyfwx
--

COPY public.ingredients (id, name, measurement) FROM stdin;
1	chicken	g
6	milk	ml
7	salt	teaspoon
8	cranberries	g
3	carrot	gg
24	potato	g
26	cucumber	piece
2	egg	piece
5	beetroot	piece
28	cabbage	piece
\.


--
-- TOC entry 4366 (class 0 OID 140329)
-- Dependencies: 217
-- Data for Name: recipe_ingredients; Type: TABLE DATA; Schema: public; Owner: iwkprkueyxyfwx
--

COPY public.recipe_ingredients (id, "recipeId", "ingredientId", quantity) FROM stdin;
278	84	2	2
246	29	2	1
279	84	5	3
280	84	1	1
204	59	2	3
205	59	6	400
281	84	7	111
31	29	7	4
318	183	28	11
303	183	2	4
299	183	1	200
301	183	24	500
300	183	6	500
302	183	7	2
275	36	1	150
269	36	6	100
277	36	8	2
276	36	3	22
12	36	5	46
26	35	2	2
27	23	7	2
28	28	7	2
29	28	8	100
30	28	3	30
33	31	7	2
34	32	7	1
319	194	6	9
25	33	2	33
24	33	1	1
316	189	6	2
314	189	8	1
313	189	7	2
315	189	2	5
312	189	1	100
274	34	1	200
273	34	2	2
263	34	5	5
265	34	6	2
266	34	7	1
272	34	8	2
197	58	1	1
198	58	5	1
203	58	7	1
202	58	8	1
228	57	7	1
215	57	5	3
32	30	7	3
\.


--
-- TOC entry 4378 (class 0 OID 0)
-- Dependencies: 210
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: iwkprkueyxyfwx
--

SELECT pg_catalog.setval('public.categories_id_seq', 20, true);


--
-- TOC entry 4379 (class 0 OID 0)
-- Dependencies: 212
-- Name: images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: iwkprkueyxyfwx
--

SELECT pg_catalog.setval('public.images_id_seq', 144, true);


--
-- TOC entry 4380 (class 0 OID 0)
-- Dependencies: 214
-- Name: ingridients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: iwkprkueyxyfwx
--

SELECT pg_catalog.setval('public.ingridients_id_seq', 28, true);


--
-- TOC entry 4381 (class 0 OID 0)
-- Dependencies: 216
-- Name: meals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: iwkprkueyxyfwx
--

SELECT pg_catalog.setval('public.meals_id_seq', 13, true);


--
-- TOC entry 4382 (class 0 OID 0)
-- Dependencies: 218
-- Name: recipe_ingredients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: iwkprkueyxyfwx
--

SELECT pg_catalog.setval('public.recipe_ingredients_id_seq', 319, true);


--
-- TOC entry 4383 (class 0 OID 0)
-- Dependencies: 220
-- Name: recipes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: iwkprkueyxyfwx
--

SELECT pg_catalog.setval('public.recipes_id_seq', 194, true);


--
-- TOC entry 4384 (class 0 OID 0)
-- Dependencies: 222
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: iwkprkueyxyfwx
--

SELECT pg_catalog.setval('public.users_id_seq', 62, true);


-- Completed on 2022-05-31 12:31:55

--
-- PostgreSQL database dump complete
--

