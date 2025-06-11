// Updated Landing Page for Digital Bhaat
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import heroImg from "../../assets/homeBg.png";
import girlHope from "../../assets/hopefullGirl.jpg";
import homeBackground from "../../assets/homeBg.png";
import danger from "../../assets/danger.png"

const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
};

const listVariants = {
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.25 },
    },
    hidden: { opacity: 0 },
};

const itemVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 30 },
};

const LandingPage = () => {
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);

    const causes = [
        {
            title: "Ending Dowry Burden",
            desc: "Poor families often face the unbearable pressure of dowry. Digital Bhaat helps them celebrate without shame.",
            img: girlHope,
        },
        {
            title: "Verified Donations",
            desc: "Every donation request goes through documentation verification. Your help reaches those who truly need it.",
            img: girlHope,
        },
        {
            title: "Anyone Can Give",
            desc: "Not just the wealthy — even the underprivileged can support through game rewards. Charity for all.",
            img: girlHope,
        },
    ];

    const uniqueness = [
        {
            title: "Verified Requests Only",
            desc: "Every donation request is screened through proper documentation to ensure transparency and real need.",
        },
        {
            title: "Gamify Charity",
            desc: "Even those with no money can contribute by playing in-app games and converting rewards into donations.",
        },
        {
            title: "Direct Family Support",
            desc: "Your donation goes straight to the girl's family — no cuts, no commissions.",
        },
    ];

    const steps = [
        {
            number: "1",
            title: "Choose a Family",
            desc: "Select a verified wedding donation request and read their story.",
        },
        {
            number: "2",
            title: "Make a Donation or Play",
            desc: "Contribute money or play games to generate donation credits.",
        },
        {
            number: "3",
            title: "Celebrate the Impact",
            desc: "Receive updates and blessings from the families you support.",
        },
    ];

    const testimonials = [
        {
            name: "Sunita Devi",
            role: "Mother of Bride",
            message:
                "Digital Bhaat saved my daughter’s wedding. We received love and support beyond our village.",
            img: homeBackground,
        },
        {
            name: "Ramesh Bhai",
            role: "Game Donor",
            message:
                "Even without money, I was able to support someone’s big day by playing games. Feels amazing!",
            img: homeBackground,
        },
    ];

    return (
        <div className="font-sans text-gray-900 bg-white overflow-x-hidden">
            <section className="relative min-h-screen bg-cover bg-center flex items-center" style={{ backgroundImage: `url(${heroImg})` }}>
                <div className="absolute inset-0 bg-black bg-opacity-70 z-0" />
                <div className="container mx-auto px-6 md:px-12 relative z-20 flex flex-col md:flex-row items-center justify-between">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        transition={{ duration: 0.8 }}
                        className="max-w-xl text-center md:text-left"
                    >
                        <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg">
                            Digital Bhaat: Daughters Deserve Dignity
                        </h1>
                        <p className="text-xl text-[#c98c64] italic font-semibold tracking-wide mb-4">
                            Help fund weddings. End the silent suffering.
                        </p>
                        <p className="text-white text-lg mb-8 max-w-lg">
                            Join a movement where anyone — rich or poor — can uplift a daughter's life. Verified families. Real impact. No middlemen.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate("/register")}
                            className="bg-[#c98c64] hover:bg-yellow-500 text-gray-900 font-semibold rounded-full px-12 py-4 shadow-lg transition"
                        >
                            Support a Family
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={() => navigate("/games")}
                            className="mt-4 text-white underline text-sm block"
                        >
                            Can't donate? Play games & support instead →
                        </motion.button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                        className="hidden md:block max-w-md rounded-xl overflow-hidden shadow-2xl pt-20"
                    >
                        <motion.img
                            src={girlHope}
                            alt="Hopeful Girl"
                            className="w-full object-cover"
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 6, repeat: Infinity, repeatType: "loop" }}
                            loading="lazy"
                        />
                    </motion.div>
                </div>
            </section>

            <section className="container mx-auto px-6 md:px-12 py-20 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-4xl font-extrabold mb-4">Why Support Digital Bhaat?</h2>
                    <p className="text-xl text-[#c98c64] italic font-semibold tracking-wide ">
                        Beti Bachao, Beti Padhao, Beti Ki Shadi Mei Saath Nibhao.
                    </p>
                    <p className="text-gray-700 text-lg">
                        Breaking financial chains, empowering weddings, and creating dignity in Indian households.
                    </p>
                </motion.div>

                <motion.div
                    variants={listVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid gap-12 md:grid-cols-3"
                >
                    {causes.map(({ title, desc, img }, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                            className="rounded-xl shadow-lg overflow-hidden cursor-pointer bg-white"
                        >
                            <img src={img} alt={title} className="w-full h-56 object-cover" loading="lazy" />
                            <div className="p-6">
                                <h3 className="font-bold text-xl mb-2">{title}</h3>
                                <p className="text-gray-600">{desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            <section className="bg-[#fef9f6] py-20">
                <div className="container mx-auto px-6 md:px-12 max-w-6xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="text-3xl font-bold text-center mb-12"
                    >
                        What Makes Digital Bhaat Unique
                    </motion.h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {uniqueness.map(({ title, desc }, i) => (
                            <div key={i} className="bg-white shadow-md p-6 rounded-xl">
                                <h3 className="font-bold text-lg mb-2 text-[#8b5c3d]">{title}</h3>
                                <p className="text-gray-600">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative py-20  overflow-hidden">
                {/* Blurred Background Image */}
                <div
                    style={{
                        backgroundImage: `url(${danger})`,
                        backgroundSize: "700px",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        filter: "blur(0px)", // Apply blur here only
                        WebkitFilter: "blur(0px)",
                    }}
                    className="absolute inset-0 z-0"
                />

                {/* Soft overlay to tint the background */}
                <div className="absolute inset-0 bg-[#fef9f6]/80 z-0" />

                {/* Foreground content */}
                <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-6xl text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="text-4xl font-extrabold mb-6 text-[#8b5c3d]"
                    >
                        Preventing a Silent Genocide
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto"
                    >
                        In many parts of India, financial pressure and societal shame force families to see daughters as burdens — leading to silent tragedies like <strong>female infanticide, child marriage, and gender-based neglect</strong>.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg text-gray-700 max-w-3xl mx-auto"
                    >
                        <strong className="text-[#c98c64]">Digital Bhaat</strong> tackles this head-on — by offering <strong>dignified support to girls' weddings</strong>, we’re rewriting the story of value, respect, and equality for daughters across India.
                    </motion.p>
                </div>
            </section>




            <section className="bg-gray-50 py-20">
                <div className="container mx-auto px-6 md:px-12 max-w-5xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="text-4xl font-extrabold text-center mb-16"
                    >
                        How It Works
                    </motion.h2>
                    <motion.div
                        variants={listVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row gap-10"
                    >
                        {steps.map(({ number, title, desc }) => (
                            <motion.div
                                key={number}
                                variants={itemVariants}
                                className="flex-1 bg-white rounded-xl p-8 shadow-lg text-center"
                            >
                                <motion.div
                                    className="text-[#c98c64] font-bold text-4xl mb-4 rounded-full w-16 h-16 flex items-center justify-center border-4 border-[#c98c64] mx-auto"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.5, type: "spring" }}
                                    viewport={{ once: true }}
                                >
                                    {number}
                                </motion.div>
                                <h3 className="text-xl font-semibold mb-3">{title}</h3>
                                <p className="text-gray-700">{desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className="container mx-auto px-6 md:px-12 py-20 max-w-6xl">
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-4xl font-extrabold text-center mb-16"
                >
                    Families We've Touched
                </motion.h2>

                <motion.div
                    variants={listVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row gap-12"
                >
                    {testimonials.map(({ name, role, message, img }, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            className="flex-1 bg-yellow-50 rounded-xl p-8 shadow-md flex flex-col items-center text-center"
                        >
                            <img src={img} alt={`${name}'s photo`} className="w-24 h-24 rounded-full object-cover mb-6 border-4 border-[#c98c64]" loading="lazy" />
                            <p className="italic mb-6">"{message}"</p>
                            <div className="font-bold text-lg">{name}</div>
                            <div className="text-yellow-600 text-sm">{role}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            <section className="bg-[#8b5c3d] text-white py-16">
                <div className="container mx-auto px-6 md:px-12 max-w-3xl text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="text-3xl font-bold mb-4"
                    >
                        Stay Updated
                    </motion.h2>
                    <p className="mb-8 max-w-xl mx-auto">
                        Subscribe to our newsletter to receive the latest stories and updates from Digital Bhaat.
                    </p>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setSubmitted(true);
                            setTimeout(() => setSubmitted(false), 3500);
                        }}
                        className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
                    >
                        <input
                            type="email"
                            required
                            placeholder="Your Email"
                            className="px-4 py-3 rounded-full text-white flex-grow border border-white"
                        />
                        <button
                            type="submit"
                            className="bg-[#c98c64] hover:bg-yellow-500 text-white font-semibold rounded-full px-8 py-3 transition"
                        >
                            Subscribe
                        </button>
                    </form>

                    {submitted && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-green-400 mt-4"
                            role="alert"
                        >
                            Thank you for subscribing!
                        </motion.p>
                    )}
                </div>
            </section>

            <footer className="bg-[#000000e6] text-white py-8 text-center text-sm select-text">
                © {new Date().getFullYear()} Digital Bhaat & Beti Bachao Initiative. All rights reserved.
            </footer>
        </div>
    );
};

export default LandingPage;
