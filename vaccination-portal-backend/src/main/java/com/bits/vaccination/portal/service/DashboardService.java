package com.bits.vaccination.portal.service;

import org.springframework.stereotype.Service;

import com.bits.vaccination.portal.dto.DashboardMetricsDTO;

@Service
public interface DashboardService {
    DashboardMetricsDTO getDashboardMetrics();
}
