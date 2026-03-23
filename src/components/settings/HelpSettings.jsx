import {
  Globe,
  Users,
  Mail,
  AlertCircle,
  Clock,
  Server,
  Smartphone,
  FileText,
  HelpCircle,
  BarChart3,
  Activity,
} from "lucide-react";

export default function HelpSettings() {
  return (
    <div className="card border-0 shadow-lg mb-4">
      <div className="card-header bg-transparent border-0 py-4">
        <h5 className="fw-bold mb-0">
          <HelpCircle size={20} className="me-2" />
          Help & Support Center
        </h5>
      </div>

      <div className="card-body">
        <div className="row g-5">
          {/* ================= LEFT CONTENT ================= */}
          <div className="col-lg-12">
            {/* ===== GETTING STARTED ===== */}
            <div className="mb-5">
              <h5 className="fw-bold mb-4">Getting Started</h5>

              <div className="row g-4">
                {[
                  {
                    title: "Device Setup Guide",
                    desc: "Add and configure MikroTik or network devices",
                    icon: <Server size={20} />,
                  },
                  {
                    title: "Network Monitoring",
                    desc: "Track bandwidth, uptime & performance",
                    icon: <Activity size={20} />,
                  },
                  {
                    title: "Customer Management",
                    desc: "Manage subscribers and billing",
                    icon: <Users size={20} />,
                  },
                  {
                    title: "API Integration",
                    desc: "Connect external systems securely",
                    icon: <Globe size={20} />,
                  },
                  {
                    title: "Reports & Analytics",
                    desc: "Generate revenue & usage reports",
                    icon: <BarChart3 size={20} />,
                  },
                  {
                    title: "Troubleshooting",
                    desc: "Fix common ISP operational issues",
                    icon: <AlertCircle size={20} />,
                  },
                ].map((guide, index) => (
                  <div className="col-12" key={index}>
                    <div className="card border-0 shadow-sm">
                      <div className="card-body d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className="p-3 rounded bg-primary bg-opacity-10 text-primary me-3">
                            {guide.icon}
                          </div>

                          <div>
                            <h6 className="fw-bold mb-1">{guide.title}</h6>
                            <p className="text-muted small mb-0">
                              {guide.desc}
                            </p>
                          </div>
                        </div>

                        <button className="btn btn-sm btn-outline-primary">
                          Read Guide →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ===== FAQ ===== */}
            <div>
              <h5 className="fw-bold mb-4">Frequently Asked Questions</h5>

              <div className="accordion" id="faqAccordion">
                {[
                  {
                    question: "How do I reset a device password?",
                    answer:
                      "Go to Devices → Select Device → Security Tab → Reset Password.",
                  },
                  {
                    question: "Can I export monitoring data?",
                    answer:
                      "Yes, export data as CSV, JSON or PDF from Reports.",
                  },
                  {
                    question: "How are bandwidth thresholds calculated?",
                    answer:
                      "Based on configured billing cycle and threshold logic.",
                  },
                  {
                    question: "What is the device limit?",
                    answer:
                      "Supports up to 10,000 devices. Enterprise scaling available.",
                  },
                ].map((faq, index) => (
                  <div
                    className="accordion-item border-0 mb-3 shadow-sm rounded"
                    key={index}
                  >
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed fw-semibold bg-light"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#faq${index}`}
                      >
                        {faq.question}
                      </button>
                    </h2>
                    <div
                      id={`faq${index}`}
                      className="accordion-collapse collapse"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body bg-white">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= SIDEBAR ================= */}
          <div className="col-lg-12">
            <div className="sticky-top" style={{ top: "20px" }}>
              {/* SUPPORT CONTACT */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <h6 className="fw-bold mb-4 d-flex align-items-center">
                    <HelpCircle size={18} className="me-2 text-primary" />
                    Support Contact
                  </h6>

                  {/* EMAIL */}
                  <div className="d-flex align-items-start mb-4">
                    <div className="p-2 rounded bg-primary bg-opacity-10 text-primary me-3">
                      <Mail size={18} />
                    </div>

                    <div>
                      <div className="fw-semibold">Email Support</div>
                      <a
                        href="mailto:support@ispmanager.com"
                        className="text-decoration-none fw-medium"
                      >
                        support@ispmanager.com
                      </a>
                      <div className="text-muted small">
                        Average response: within 4 hours
                      </div>
                    </div>
                  </div>
                  <hr />

                  {/* PHONE */}
                  <div className="d-flex align-items-start mb-4">
                    <div className="p-2 rounded bg-success bg-opacity-10 text-success me-3">
                      <Smartphone size={18} />
                    </div>

                    <div>
                      <div className="fw-semibold">Phone Support</div>
                      <div className="fw-medium">+1 (555) 123-4567</div>
                      <div className="text-muted small">
                        24/7 Emergency Line
                      </div>
                    </div>
                  </div>
                  <hr />

                  {/* SUPPORT HOURS */}
                  <div className="d-flex align-items-start">
                    <div className="p-2 rounded bg-warning bg-opacity-10 text-warning me-3">
                      <Clock size={18} />
                    </div>

                    <div>
                      <div className="fw-semibold">Support Hours</div>
                      <div className="fw-medium">Mon–Fri: 9AM–6PM</div>
                      <div className="text-muted small">
                        Emergency assistance available anytime
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SYSTEM INFO */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                  <h6 className="fw-bold mb-4">System Information</h6>

                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Version</span>
                    <span className="fw-semibold">v3.2.1</span>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">License</span>
                    <span className="badge bg-success">Enterprise</span>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Support Plan</span>
                    <span className="badge bg-primary">Premium</span>
                  </div>

                  <button className="btn btn-outline-primary w-100 mt-4">
                    Check for Updates
                  </button>
                </div>
              </div>

              {/* DOCUMENTATION */}
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h6 className="fw-bold mb-4">Documentation</h6>

                  <div className="list-group list-group-flush">
                    <a href="#" className="list-group-item px-0 border-0">
                      <FileText size={16} className="me-2" />
                      User Manual
                    </a>
                    <a href="#" className="list-group-item px-0 border-0">
                      <FileText size={16} className="me-2" />
                      API Documentation
                    </a>
                    <a href="#" className="list-group-item px-0 border-0">
                      <FileText size={16} className="me-2" />
                      Deployment Guide
                    </a>
                    <a href="#" className="list-group-item px-0 border-0">
                      <FileText size={16} className="me-2" />
                      Troubleshooting Guide
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
